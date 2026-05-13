const db = require('../config/db');
const R  = require('../utils/response');
const { getPagination, paginationMeta } = require('../utils/pagination');

// GET /api/comments?target_type=resource&target_id=1
const getComments = async (req, res) => {
  const { target_type, target_id } = req.query;
  if (!target_type || !target_id) return R.badRequest(res, 'Thiếu target_type hoặc target_id');
  try {
    const [rows] = await db.query(
      `SELECT c.*, u.name AS author_name, u.username, u.avatar_url AS author_avatar
       FROM comments c JOIN users u ON c.user_id=u.id
       WHERE c.target_type=? AND c.target_id=? AND c.parent_id IS NULL
       ORDER BY c.created_at ASC`, [target_type, target_id]
    );
    return R.success(res, { comments: rows });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/comments
const createComment = async (req, res) => {
  const { target_type, target_id, content, parent_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO comments (user_id, target_type, target_id, content, parent_id) VALUES (?,?,?,?,?)',
      [req.user.id, target_type, target_id, content, parent_id || null]
    );
    // Increment comments_count on the target
    const tableMap = { post: 'community_posts', reel: 'reels' };
    if (tableMap[target_type]) {
      await db.query(`UPDATE ${tableMap[target_type]} SET comments_count = comments_count+1 WHERE id=?`, [target_id]);
    }
    return R.created(res, { id: result.insertId }, 'Đã bình luận');
  } catch (err) { return R.error(res, 'Bình luận thất bại', 500, err); }
};

// DELETE /api/comments/:id
const deleteComment = async (req, res) => {
  try {
    await db.query('DELETE FROM comments WHERE id=? AND user_id=?', [req.params.id, req.user.id]);
    return R.success(res, null, 'Đã xoá bình luận');
  } catch (err) { return R.error(res, 'Xoá thất bại', 500, err); }
};

module.exports = { getComments, createComment, deleteComment };
