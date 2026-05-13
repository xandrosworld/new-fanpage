const db = require('../config/db');
const R  = require('../utils/response');
const { getPagination, paginationMeta } = require('../utils/pagination');

// GET /api/tasks
const getAll = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { type, status, search } = req.query;
  try {
    const params = [];
    let where = 'WHERE 1=1';
    if (type)   { where += ' AND type = ?';              params.push(type); }
    if (status) { where += ' AND status = ?';            params.push(status); }
    else        { where += ' AND status = "active"'; }
    if (search) { where += ' AND title LIKE ?';          params.push(`%${search}%`); }

    const [[{ total }]] = await db.query(`SELECT COUNT(*) AS total FROM tasks ${where}`, params);
    const [rows] = await db.query(`SELECT * FROM tasks ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, limit, offset]);
    return R.success(res, { tasks: rows, pagination: paginationMeta(total, page, limit) });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// GET /api/tasks/:id
const getOne = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id=?', [req.params.id]);
    if (!rows[0]) return R.notFound(res, 'Nhiệm vụ không tồn tại');
    return R.success(res, rows[0]);
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/tasks/:id/start — mark as started (skeleton, no DB change needed unless you track started)
const start = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, status, total_slots, used_slots FROM tasks WHERE id=?', [req.params.id]);
    const task = rows[0];
    if (!task) return R.notFound(res, 'Nhiệm vụ không tồn tại');
    if (task.status !== 'active') return R.badRequest(res, 'Nhiệm vụ không còn hoạt động');
    if (task.total_slots > 0 && task.used_slots >= task.total_slots) return R.badRequest(res, 'Nhiệm vụ đã hết slot');
    return R.success(res, { task_id: task.id, started: true }, 'Bắt đầu nhiệm vụ thành công');
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/tasks/:id/submit — create task submission
const submit = async (req, res) => {
  const { proof_url, note } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id=? AND status="active"', [req.params.id]);
    if (!rows[0]) return R.notFound(res, 'Nhiệm vụ không tồn tại hoặc đã kết thúc');

    // Check if user already submitted and pending
    const [existing] = await db.query(
      'SELECT id FROM task_submissions WHERE task_id=? AND user_id=? AND status="pending"', [req.params.id, req.user.id]
    );
    if (existing.length > 0) return R.badRequest(res, 'Bạn đã gửi minh chứng và đang chờ duyệt');

    const [result] = await db.query(
      'INSERT INTO task_submissions (task_id, user_id, proof_url, note, reward_amount, status) VALUES (?,?,?,?,?,?)',
      [req.params.id, req.user.id, proof_url || null, note || null, rows[0].reward_amount, 'pending']
    );
    return R.created(res, { submission_id: result.insertId }, 'Đã gửi minh chứng, vui lòng chờ admin duyệt');
  } catch (err) { return R.error(res, 'Gửi minh chứng thất bại', 500, err); }
};

module.exports = { getAll, getOne, start, submit };
