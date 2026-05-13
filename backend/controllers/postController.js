const db = require('../config/db');
const R  = require('../utils/response');
const { getPagination, paginationMeta } = require('../utils/pagination');

// GET /api/posts
const getAll = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  try {
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM community_posts');
    const [rows] = await db.query(
      `SELECT cp.*, u.name AS author_name, u.username, u.avatar_url AS author_avatar
       FROM community_posts cp JOIN users u ON cp.user_id = u.id
       ORDER BY cp.created_at DESC LIMIT ? OFFSET ?`, [limit, offset]
    );
    return R.success(res, { posts: rows, pagination: paginationMeta(total, page, limit) });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/posts
const create = async (req, res) => {
  const { content, image_url, post_type } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO community_posts (user_id, content, image_url, post_type) VALUES (?,?,?,?)',
      [req.user.id, content, image_url || null, post_type || 'text']
    );
    return R.created(res, { id: result.insertId }, 'Đã đăng bài');
  } catch (err) { return R.error(res, 'Đăng bài thất bại', 500, err); }
};

// GET /api/posts/:id
const getOne = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT cp.*, u.name AS author_name, u.username, u.avatar_url AS author_avatar
       FROM community_posts cp JOIN users u ON cp.user_id=u.id WHERE cp.id=?`, [req.params.id]
    );
    if (!rows[0]) return R.notFound(res);
    return R.success(res, rows[0]);
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// DELETE /api/posts/:id
const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM community_posts WHERE id=? AND user_id=?', [req.params.id, req.user.id]);
    return R.success(res, null, 'Đã xoá bài viết');
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/posts/:id/like  (toggle)
const like = async (req, res) => {
  try {
    const [ex] = await db.query('SELECT id FROM likes WHERE user_id=? AND target_type="post" AND target_id=?', [req.user.id, req.params.id]);
    if (ex.length) {
      await db.query('DELETE FROM likes WHERE user_id=? AND target_type="post" AND target_id=?', [req.user.id, req.params.id]);
      await db.query('UPDATE community_posts SET likes_count = GREATEST(0, likes_count-1) WHERE id=?', [req.params.id]);
      return R.success(res, { liked: false });
    }
    await db.query('INSERT INTO likes (user_id, target_type, target_id) VALUES (?,?,?)', [req.user.id, 'post', req.params.id]);
    await db.query('UPDATE community_posts SET likes_count = likes_count+1 WHERE id=?', [req.params.id]);
    return R.success(res, { liked: true });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/posts/:id/share
const share = async (req, res) => {
  try {
    await db.query('UPDATE community_posts SET shares_count = shares_count+1 WHERE id=?', [req.params.id]);
    return R.success(res, null, 'Đã chia sẻ');
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

module.exports = { getAll, create, getOne, remove, like, share };
