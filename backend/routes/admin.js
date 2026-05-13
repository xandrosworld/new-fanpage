const router = require('express').Router();
const c     = require('../controllers/adminController');
const auth  = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');
const { getPagination } = require('../utils/pagination');
const db    = require('../config/db');
const R     = require('../utils/response');

router.use(auth, admin); // All admin routes require auth + admin role

router.get('/dashboard', c.dashboard);

// Users
router.get('/users', async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const [rows] = await db.query('SELECT id, name, username, email, role, status, balance, created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
  return R.success(res, { users: rows });
});
router.patch('/users/:id/status', c.updateUserStatus);

// Resources
router.get('/resources', async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { status } = req.query;
  const where = status ? 'WHERE r.status=?' : 'WHERE 1=1';
  const params = status ? [status, limit, offset] : [limit, offset];
  const [rows] = await db.query(`SELECT r.*, u.name AS author_name FROM resources r JOIN users u ON r.user_id=u.id ${where} ORDER BY r.created_at DESC LIMIT ? OFFSET ?`, params);
  return R.success(res, { resources: rows });
});
router.patch('/resources/:id/status', c.updateResourceStatus);

// Blogs
router.get('/blogs', async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const [rows] = await db.query('SELECT b.*, u.name AS author_name FROM blog_posts b JOIN users u ON b.user_id=u.id ORDER BY b.created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
  return R.success(res, { blogs: rows });
});
router.patch('/blogs/:id/status', c.updateBlogStatus);

// Reels
router.get('/reels', async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const [rows] = await db.query('SELECT r.*, u.name AS author_name FROM reels r JOIN users u ON r.user_id=u.id ORDER BY r.created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
  return R.success(res, { reels: rows });
});
router.patch('/reels/:id/status', c.updateReelStatus);

// Tasks
router.get('/tasks', async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
  return R.success(res, { tasks: rows });
});
router.post('/tasks',          c.createTask);
router.patch('/tasks/:id',    async (req, res) => {
  const { title, description, reward_amount, status } = req.body;
  await db.query('UPDATE tasks SET title=?, description=?, reward_amount=?, status=? WHERE id=?', [title, description, reward_amount, status, req.params.id]);
  return R.success(res, null, 'Cập nhật nhiệm vụ thành công');
});
router.patch('/tasks/:id/status', async (req, res) => {
  await db.query('UPDATE tasks SET status=? WHERE id=?', [req.body.status, req.params.id]);
  return R.success(res, null, 'Cập nhật trạng thái nhiệm vụ thành công');
});

// Task submissions
router.get('/task-submissions',           c.getSubmissions);
router.patch('/task-submissions/:id/approve', c.approveSubmission);
router.patch('/task-submissions/:id/reject',  c.rejectSubmission);

// Withdraw requests
router.get('/withdraw-requests',             c.getWithdrawRequests);
router.patch('/withdraw-requests/:id/status', c.updateWithdrawStatus);

// Reports
router.get('/reports', async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const [rows] = await db.query('SELECT r.*, u.name AS reporter_name FROM reports r JOIN users u ON r.reporter_id=u.id ORDER BY r.created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
  return R.success(res, { reports: rows });
});
router.patch('/reports/:id/status', async (req, res) => {
  await db.query('UPDATE reports SET status=? WHERE id=?', [req.body.status, req.params.id]);
  return R.success(res, null, 'Cập nhật trạng thái báo cáo thành công');
});

module.exports = router;
