const db = require('../config/db');
const R  = require('../utils/response');
const { getPagination, paginationMeta } = require('../utils/pagination');

// GET /api/reels
const getAll = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { category } = req.query;
  try {
    let where = 'WHERE r.status = "published"';
    const params = [];
    if (category) { where += ' AND r.category = ?'; params.push(category); }
    const [[{ total }]] = await db.query(`SELECT COUNT(*) AS total FROM reels r ${where}`, params);
    const [rows] = await db.query(
      `SELECT r.*, u.name AS author_name, u.username, u.avatar_url AS author_avatar
       FROM reels r JOIN users u ON r.user_id = u.id
       ${where} ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    return R.success(res, { reels: rows, pagination: paginationMeta(total, page, limit) });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// GET /api/reels/:id
const getOne = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*, u.name AS author_name, u.username, u.avatar_url AS author_avatar
       FROM reels r JOIN users u ON r.user_id=u.id WHERE r.id=?`, [req.params.id]
    );
    if (!rows[0]) return R.notFound(res);
    return R.success(res, rows[0]);
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/reels
const create = async (req, res) => {
  const { title, caption, video_url, thumbnail_url, category, hashtags } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO reels (user_id, title, caption, video_url, thumbnail_url, category, hashtags) VALUES (?,?,?,?,?,?,?)',
      [req.user.id, title, caption, video_url, thumbnail_url, category, JSON.stringify(hashtags || [])]
    );
    return R.created(res, { id: result.insertId });
  } catch (err) { return R.error(res, 'Tạo Reel thất bại', 500, err); }
};

// POST /api/reels/:id/view
const view = async (req, res) => {
  try {
    await db.query('UPDATE reels SET views_count = views_count+1 WHERE id=?', [req.params.id]);
    return R.success(res, null, 'Đã ghi nhận lượt xem');
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/reels/:id/like  (toggle)
const like = async (req, res) => {
  try {
    const [ex] = await db.query('SELECT id FROM likes WHERE user_id=? AND target_type="reel" AND target_id=?', [req.user.id, req.params.id]);
    if (ex.length) {
      await db.query('DELETE FROM likes WHERE user_id=? AND target_type="reel" AND target_id=?', [req.user.id, req.params.id]);
      await db.query('UPDATE reels SET likes_count = GREATEST(0, likes_count-1) WHERE id=?', [req.params.id]);
      return R.success(res, { liked: false });
    }
    await db.query('INSERT INTO likes (user_id, target_type, target_id) VALUES (?,?,?)', [req.user.id, 'reel', req.params.id]);
    await db.query('UPDATE reels SET likes_count = likes_count+1 WHERE id=?', [req.params.id]);
    return R.success(res, { liked: true });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/reels/:id/save
const save = async (req, res) => {
  try {
    const [ex] = await db.query('SELECT id FROM saved_items WHERE user_id=? AND target_type="reel" AND target_id=?', [req.user.id, req.params.id]);
    if (ex.length) {
      await db.query('DELETE FROM saved_items WHERE user_id=? AND target_type="reel" AND target_id=?', [req.user.id, req.params.id]);
      return R.success(res, { saved: false });
    }
    await db.query('INSERT INTO saved_items (user_id, target_type, target_id) VALUES (?,?,?)', [req.user.id, 'reel', req.params.id]);
    return R.success(res, { saved: true });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/reels/:id/share
const share = async (req, res) => {
  try {
    await db.query('UPDATE reels SET shares_count = shares_count+1 WHERE id=?', [req.params.id]);
    return R.success(res, null, 'Đã chia sẻ');
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

module.exports = { getAll, getOne, create, view, like, save, share };
