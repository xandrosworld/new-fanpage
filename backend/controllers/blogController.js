const db = require('../config/db');
const R  = require('../utils/response');
const { getPagination, paginationMeta } = require('../utils/pagination');
const { slugify } = require('../utils/slugify');

// GET /api/blogs
const getAll = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { search, category } = req.query;
  try {
    const params = [];
    let where = 'WHERE b.status = "published"';
    if (search)   { where += ' AND (b.title LIKE ? OR b.excerpt LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    if (category) { where += ' AND bc.slug = ?'; params.push(category); }

    const [[{ total }]] = await db.query(`SELECT COUNT(*) AS total FROM blog_posts b LEFT JOIN blog_categories bc ON b.category_id=bc.id ${where}`, params);
    const [rows] = await db.query(
      `SELECT b.id, b.title, b.slug, b.excerpt, b.cover_url, b.reading_time, b.views_count, b.created_at,
              bc.name AS category_name, bc.slug AS category_slug,
              u.name AS author_name, u.username AS author_username, u.avatar_url AS author_avatar
       FROM blog_posts b
       LEFT JOIN blog_categories bc ON b.category_id = bc.id
       LEFT JOIN users u ON b.user_id = u.id
       ${where} ORDER BY b.created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    return R.success(res, { blogs: rows, pagination: paginationMeta(total, page, limit) });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// GET /api/blogs/:id
const getOne = async (req, res) => {
  try {
    const col = isNaN(req.params.id) ? 'b.slug' : 'b.id';
    const [rows] = await db.query(
      `SELECT b.*, bc.name AS category_name, u.name AS author_name, u.username AS author_username, u.avatar_url AS author_avatar
       FROM blog_posts b LEFT JOIN blog_categories bc ON b.category_id=bc.id LEFT JOIN users u ON b.user_id=u.id
       WHERE ${col} = ?`, [req.params.id]
    );
    if (!rows[0]) return R.notFound(res, 'Bài viết không tồn tại');
    await db.query('UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?', [rows[0].id]);
    return R.success(res, rows[0]);
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/blogs
const create = async (req, res) => {
  const { title, excerpt, content, cover_url, category_id, reading_time } = req.body;
  const slug = slugify(title) + '-' + Date.now();
  try {
    const [result] = await db.query(
      'INSERT INTO blog_posts (user_id, category_id, title, slug, excerpt, content, cover_url, reading_time, status) VALUES (?,?,?,?,?,?,?,?,?)',
      [req.user.id, category_id, title, slug, excerpt, content, cover_url, reading_time || 5, 'draft']
    );
    return R.created(res, { id: result.insertId, slug });
  } catch (err) { return R.error(res, 'Tạo bài viết thất bại', 500, err); }
};

// PATCH /api/blogs/:id
const update = async (req, res) => {
  const { title, excerpt, content, status } = req.body;
  try {
    await db.query(
      'UPDATE blog_posts SET title=?, excerpt=?, content=?, status=? WHERE id=? AND user_id=?',
      [title, excerpt, content, status, req.params.id, req.user.id]
    );
    return R.success(res, null, 'Cập nhật thành công');
  } catch (err) { return R.error(res, 'Cập nhật thất bại', 500, err); }
};

// DELETE /api/blogs/:id
const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM blog_posts WHERE id=? AND user_id=?', [req.params.id, req.user.id]);
    return R.success(res, null, 'Đã xoá bài viết');
  } catch (err) { return R.error(res, 'Xoá thất bại', 500, err); }
};

// POST /api/blogs/:id/like
const like = async (req, res) => {
  try {
    const [ex] = await db.query('SELECT id FROM likes WHERE user_id=? AND target_type="blog" AND target_id=?', [req.user.id, req.params.id]);
    if (ex.length) { await db.query('DELETE FROM likes WHERE user_id=? AND target_type="blog" AND target_id=?', [req.user.id, req.params.id]); return R.success(res, { liked: false }); }
    await db.query('INSERT INTO likes (user_id, target_type, target_id) VALUES (?,?,?)', [req.user.id, 'blog', req.params.id]);
    return R.success(res, { liked: true });
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

module.exports = { getAll, getOne, create, update, remove, like };
