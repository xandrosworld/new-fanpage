const db = require('../config/db');
const R  = require('../utils/response');
const { getPagination, paginationMeta } = require('../utils/pagination');

// GET /api/admin/dashboard
const dashboard = async (req, res) => {
  try {
    const [[{ users }]]      = await db.query('SELECT COUNT(*) AS users FROM users');
    const [[{ resources }]]  = await db.query('SELECT COUNT(*) AS resources FROM resources WHERE status="pending"');
    const [[{ blogs }]]      = await db.query('SELECT COUNT(*) AS blogs FROM blog_posts WHERE status="pending"');
    const [[{ reels }]]      = await db.query('SELECT COUNT(*) AS reels FROM reels WHERE status="pending"');
    const [[{ tasks }]]      = await db.query('SELECT COUNT(*) AS tasks FROM tasks WHERE status="active"');
    const [[{ submissions }]]= await db.query('SELECT COUNT(*) AS submissions FROM task_submissions WHERE status="pending"');
    const [[{ withdraws }]]  = await db.query('SELECT COUNT(*) AS withdraws FROM withdraw_requests WHERE status="pending"');
    return R.success(res, { users, resources_pending: resources, blogs_pending: blogs, reels_pending: reels, active_tasks: tasks, submissions_pending: submissions, withdraws_pending: withdraws });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// PATCH /api/admin/users/:id/status
const updateUserStatus = async (req, res) => {
  const { status } = req.body;
  try {
    await db.query('UPDATE users SET status=? WHERE id=?', [status, req.params.id]);
    return R.success(res, null, 'Cập nhật trạng thái user thành công');
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// Generic status update factory for content tables
const updateContentStatus = (table) => async (req, res) => {
  const { status } = req.body;
  try {
    await db.query(`UPDATE ${table} SET status=? WHERE id=?`, [status, req.params.id]);
    return R.success(res, null, 'Cập nhật trạng thái thành công');
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/admin/tasks
const createTask = async (req, res) => {
  const { title, type, description, steps, reward_amount, estimated_time, total_slots, proof_required, deadline } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO tasks (created_by, title, type, description, steps, reward_amount, estimated_time, total_slots, proof_required, status, deadline) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [req.user.id, title, type, description, JSON.stringify(steps || []), reward_amount, estimated_time, total_slots || 0, proof_required !== false ? 1 : 0, 'active', deadline || null]
    );
    return R.created(res, { id: result.insertId }, 'Tạo nhiệm vụ thành công');
  } catch (err) { return R.error(res, 'Tạo nhiệm vụ thất bại', 500, err); }
};

// GET /api/admin/task-submissions
const getSubmissions = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { status } = req.query;
  try {
    let where = 'WHERE 1=1';
    const params = [];
    if (status) { where += ' AND ts.status=?'; params.push(status); }
    const [[{ total }]] = await db.query(`SELECT COUNT(*) AS total FROM task_submissions ts ${where}`, params);
    const [rows] = await db.query(
      `SELECT ts.*, t.title AS task_title, t.reward_amount AS task_reward,
              u.name AS user_name, u.username, u.avatar_url
       FROM task_submissions ts
       JOIN tasks t ON ts.task_id = t.id
       JOIN users u ON ts.user_id = u.id
       ${where} ORDER BY ts.created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    return R.success(res, { submissions: rows, pagination: paginationMeta(total, page, limit) });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// PATCH /api/admin/task-submissions/:id/approve
const approveSubmission = async (req, res) => {
  const subId = req.params.id;
  try {
    const [[sub]] = await db.query('SELECT * FROM task_submissions WHERE id=?', [subId]);
    if (!sub) return R.notFound(res, 'Không tìm thấy bài nộp');
    if (sub.status !== 'pending') return R.badRequest(res, 'Bài nộp này đã được xử lý');

    await db.query('UPDATE task_submissions SET status="approved", reviewed_by=?, reviewed_at=NOW() WHERE id=?', [req.user.id, subId]);
    // Credit reward to user balance
    await db.query('UPDATE users SET balance = balance + ? WHERE id=?', [sub.reward_amount, sub.user_id]);
    // Create success wallet transaction
    await db.query(
      'INSERT INTO wallet_transactions (user_id, type, amount, status, reference_code, note) VALUES (?,?,?,?,?,?)',
      [sub.user_id, 'task_reward', sub.reward_amount, 'success', 'TASK-' + subId, `Thưởng nhiệm vụ #${sub.task_id}`]
    );
    // Increment used_slots
    await db.query('UPDATE tasks SET used_slots = used_slots+1 WHERE id=?', [sub.task_id]);
    return R.success(res, null, 'Đã duyệt và cộng tiền thưởng cho người dùng');
  } catch (err) { return R.error(res, 'Duyệt thất bại', 500, err); }
};

// PATCH /api/admin/task-submissions/:id/reject
const rejectSubmission = async (req, res) => {
  const { reason } = req.body;
  try {
    await db.query(
      'UPDATE task_submissions SET status="rejected", reviewed_by=?, reviewed_at=NOW(), note=? WHERE id=?',
      [req.user.id, reason || 'Không đạt yêu cầu', req.params.id]
    );
    return R.success(res, null, 'Đã từ chối bài nộp');
  } catch (err) { return R.error(res, 'Từ chối thất bại', 500, err); }
};

// GET /api/admin/withdraw-requests
const getWithdrawRequests = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { status } = req.query;
  try {
    let where = 'WHERE 1=1';
    const params = [];
    if (status) { where += ' AND wr.status=?'; params.push(status); }
    const [[{ total }]] = await db.query(`SELECT COUNT(*) AS total FROM withdraw_requests wr ${where}`, params);
    const [rows] = await db.query(
      `SELECT wr.*, u.name AS user_name, u.username, u.email
       FROM withdraw_requests wr JOIN users u ON wr.user_id=u.id
       ${where} ORDER BY wr.created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    return R.success(res, { requests: rows, pagination: paginationMeta(total, page, limit) });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// PATCH /api/admin/withdraw-requests/:id/status
const updateWithdrawStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ['processing', 'success', 'rejected'];
  if (!allowed.includes(status)) return R.badRequest(res, 'Trạng thái không hợp lệ');
  try {
    const [[wr]] = await db.query('SELECT * FROM withdraw_requests WHERE id=?', [req.params.id]);
    if (!wr) return R.notFound(res, 'Không tìm thấy yêu cầu');

    await db.query(
      'UPDATE withdraw_requests SET status=?, processed_by=?, processed_at=NOW() WHERE id=?',
      [status, req.user.id, req.params.id]
    );

    if (status === 'success') {
      // Deduct from user balance and clear pending
      await db.query('UPDATE users SET balance = GREATEST(0, balance-?), pending_balance = GREATEST(0, pending_balance-?) WHERE id=?',
        [wr.amount, wr.amount, wr.user_id]);
      // Update related wallet transaction
      await db.query('UPDATE wallet_transactions SET status="success" WHERE user_id=? AND type="withdraw" AND status="pending" LIMIT 1', [wr.user_id]);
    }

    if (status === 'rejected') {
      // Release pending balance back to balance
      await db.query('UPDATE users SET pending_balance = GREATEST(0, pending_balance-?) WHERE id=?', [wr.amount, wr.user_id]);
      await db.query('UPDATE wallet_transactions SET status="rejected" WHERE user_id=? AND type="withdraw" AND status="pending" LIMIT 1', [wr.user_id]);
    }

    return R.success(res, null, 'Cập nhật trạng thái yêu cầu rút tiền thành công');
  } catch (err) { return R.error(res, 'Cập nhật thất bại', 500, err); }
};

module.exports = {
  dashboard,
  updateUserStatus,
  updateResourceStatus: updateContentStatus('resources'),
  updateBlogStatus:     updateContentStatus('blog_posts'),
  updateReelStatus:     updateContentStatus('reels'),
  createTask,
  getSubmissions,
  approveSubmission,
  rejectSubmission,
  getWithdrawRequests,
  updateWithdrawStatus,
};
