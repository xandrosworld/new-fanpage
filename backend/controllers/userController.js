const db = require('../config/db');
const R  = require('../utils/response');
const { getPagination, paginationMeta } = require('../utils/pagination');

const SAFE_FIELDS = 'id, name, username, avatar_url, bio, role, badge, balance, followers_count, following_count, status, created_at';

// GET /api/users
const getAll = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const search = req.query.search ? `%${req.query.search}%` : null;
  try {
    let where = 'WHERE status != "banned"';
    const params = [];
    if (search) { where += ' AND (name LIKE ? OR username LIKE ?)'; params.push(search, search); }

    const [[{ total }]] = await db.query(`SELECT COUNT(*) AS total FROM users ${where}`, params);
    const [rows] = await db.query(
      `SELECT ${SAFE_FIELDS} FROM users ${where} ORDER BY followers_count DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    return R.success(res, { users: rows, pagination: paginationMeta(total, page, limit) });
  } catch (err) { return R.error(res, 'Không thể lấy danh sách user', 500, err); }
};

// GET /api/users/:username
const getByUsername = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT ${SAFE_FIELDS} FROM users WHERE username = ?`, [req.params.username]);
    if (!rows[0]) return R.notFound(res, 'Người dùng không tồn tại');
    return R.success(res, rows[0]);
  } catch (err) { return R.error(res, 'Không thể lấy thông tin user', 500, err); }
};

// PATCH /api/users/:id
const update = async (req, res) => {
  const { name, bio, avatar_url, cover_url } = req.body;
  if (parseInt(req.params.id) !== req.user.id && req.user.role !== 'admin') {
    return R.forbidden(res);
  }
  try {
    await db.query(
      'UPDATE users SET name=?, bio=?, avatar_url=?, cover_url=? WHERE id=?',
      [name, bio, avatar_url, cover_url, req.params.id]
    );
    return R.success(res, null, 'Cập nhật thành công');
  } catch (err) { return R.error(res, 'Cập nhật thất bại', 500, err); }
};

// POST /api/users/:id/follow  (toggle)
const follow = async (req, res) => {
  return R.success(res, { followed: true }, 'Đã theo dõi (skeleton)');
};

// GET /api/users/:id/resources
const getUserResources = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  try {
    const [rows] = await db.query(
      'SELECT * FROM resources WHERE user_id=? AND status="published" LIMIT ? OFFSET ?',
      [req.params.id, limit, offset]
    );
    return R.success(res, { resources: rows });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// GET /api/users/:id/posts
const getUserPosts = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  try {
    const [rows] = await db.query(
      'SELECT * FROM community_posts WHERE user_id=? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [req.params.id, limit, offset]
    );
    return R.success(res, { posts: rows });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// GET /api/users/:id/reels
const getUserReels = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  try {
    const [rows] = await db.query(
      'SELECT * FROM reels WHERE user_id=? AND status="published" LIMIT ? OFFSET ?',
      [req.params.id, limit, offset]
    );
    return R.success(res, { reels: rows });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

module.exports = { getAll, getByUsername, update, follow, getUserResources, getUserPosts, getUserReels };
