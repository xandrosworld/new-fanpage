const db = require('../config/db');
const R  = require('../utils/response');
const { getPagination, paginationMeta } = require('../utils/pagination');
const { slugify } = require('../utils/slugify');

// GET /api/resources
const getAll = async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { search, category, is_free, sort } = req.query;
  try {
    const params = [];
    let where = 'WHERE r.status = "published"';
    if (search)   { where += ' AND (r.title LIKE ? OR r.description LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    if (category) { where += ' AND rc.slug = ?'; params.push(category); }
    if (is_free !== undefined) { where += ' AND r.is_free = ?'; params.push(is_free === 'true' ? 1 : 0); }

    const orderMap = { newest:'r.created_at DESC', popular:'r.downloads_count DESC', rating:'r.rating DESC', price_asc:'r.price ASC', price_desc:'r.price DESC' };
    const order = orderMap[sort] || 'r.created_at DESC';

    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) AS total FROM resources r LEFT JOIN resource_categories rc ON r.category_id=rc.id ${where}`, params
    );
    const [rows] = await db.query(
      `SELECT r.*, rc.name AS category_name, rc.slug AS category_slug,
              u.name AS author_name, u.username AS author_username, u.avatar_url AS author_avatar
       FROM resources r
       LEFT JOIN resource_categories rc ON r.category_id = rc.id
       LEFT JOIN users u ON r.user_id = u.id
       ${where} ORDER BY ${order} LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    return R.success(res, { resources: rows, pagination: paginationMeta(total, page, limit) });
  } catch (err) { return R.error(res, 'Không thể lấy tài nguyên', 500, err); }
};

// GET /api/resources/:id
const getOne = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*, rc.name AS category_name, u.name AS author_name, u.username AS author_username, u.avatar_url AS author_avatar
       FROM resources r
       LEFT JOIN resource_categories rc ON r.category_id = rc.id
       LEFT JOIN users u ON r.user_id = u.id
       WHERE r.id = ?`, [req.params.id]
    );
    if (!rows[0]) return R.notFound(res, 'Tài nguyên không tồn tại');
    return R.success(res, rows[0]);
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/resources
const create = async (req, res) => {
  const { title, description, content, category_id, price, tech_stack, thumbnail_url } = req.body;
  const slug = slugify(title) + '-' + Date.now();
  const is_free = !price || parseFloat(price) === 0 ? 1 : 0;
  try {
    const [result] = await db.query(
      'INSERT INTO resources (user_id, category_id, title, slug, description, content, thumbnail_url, price, is_free, tech_stack) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [req.user.id, category_id || null, title, slug, description, content, thumbnail_url, price || 0, is_free, JSON.stringify(tech_stack || [])]
    );
    return R.created(res, { id: result.insertId, slug });
  } catch (err) { return R.error(res, 'Tạo tài nguyên thất bại', 500, err); }
};

// PATCH /api/resources/:id
const update = async (req, res) => {
  const { title, description, content, price, status } = req.body;
  try {
    await db.query(
      'UPDATE resources SET title=?, description=?, content=?, price=?, status=? WHERE id=? AND user_id=?',
      [title, description, content, price, status, req.params.id, req.user.id]
    );
    return R.success(res, null, 'Cập nhật tài nguyên thành công');
  } catch (err) { return R.error(res, 'Cập nhật thất bại', 500, err); }
};

// DELETE /api/resources/:id
const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM resources WHERE id=? AND user_id=?', [req.params.id, req.user.id]);
    return R.success(res, null, 'Đã xoá tài nguyên');
  } catch (err) { return R.error(res, 'Xoá thất bại', 500, err); }
};

// POST /api/resources/:id/download
const download = async (req, res) => {
  const resourceId = req.params.id;
  try {
    await db.query('INSERT INTO resource_downloads (resource_id, user_id) VALUES (?,?)', [resourceId, req.user.id]);
    await db.query('UPDATE resources SET downloads_count = downloads_count + 1 WHERE id=?', [resourceId]);
    const [[r]] = await db.query('SELECT file_url FROM resources WHERE id=?', [resourceId]);
    return R.success(res, { file_url: r?.file_url }, 'Tải xuống thành công');
  } catch (err) { return R.error(res, 'Lỗi tải xuống', 500, err); }
};

// POST /api/resources/:id/like  (toggle)
const like = async (req, res) => {
  try {
    const [existing] = await db.query(
      'SELECT id FROM likes WHERE user_id=? AND target_type="resource" AND target_id=?', [req.user.id, req.params.id]
    );
    if (existing.length > 0) {
      await db.query('DELETE FROM likes WHERE user_id=? AND target_type="resource" AND target_id=?', [req.user.id, req.params.id]);
      return R.success(res, { liked: false }, 'Đã bỏ thích');
    }
    await db.query('INSERT INTO likes (user_id, target_type, target_id) VALUES (?,?,?)', [req.user.id, 'resource', req.params.id]);
    return R.success(res, { liked: true }, 'Đã thích');
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

// POST /api/resources/:id/save  (toggle)
const save = async (req, res) => {
  try {
    const [existing] = await db.query(
      'SELECT id FROM saved_items WHERE user_id=? AND target_type="resource" AND target_id=?', [req.user.id, req.params.id]
    );
    if (existing.length > 0) {
      await db.query('DELETE FROM saved_items WHERE user_id=? AND target_type="resource" AND target_id=?', [req.user.id, req.params.id]);
      return R.success(res, { saved: false }, 'Đã bỏ lưu');
    }
    await db.query('INSERT INTO saved_items (user_id, target_type, target_id) VALUES (?,?,?)', [req.user.id, 'resource', req.params.id]);
    return R.success(res, { saved: true }, 'Đã lưu tài nguyên');
  } catch (err) { return R.error(res, 'Lỗi', 500, err); }
};

module.exports = { getAll, getOne, create, update, remove, download, like, save };
