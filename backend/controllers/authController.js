const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const db     = require('../config/db');
const R      = require('../utils/response');

// POST /api/auth/register
const register = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const [existing] = await db.query(
      'SELECT id FROM users WHERE email = ? OR username = ?', [email, username]
    );
    if (existing.length > 0) return R.badRequest(res, 'Email hoặc username đã tồn tại');

    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, username, email, password_hash) VALUES (?, ?, ?, ?)',
      [name, username, email, hash]
    );
    const userId = result.insertId;
    const token = jwt.sign(
      { id: userId, username, email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    return R.created(res, { token, userId }, 'Đăng ký thành công');
  } catch (err) {
    return R.error(res, 'Đăng ký thất bại', 500, err);
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT id, name, username, email, password_hash, role, status FROM users WHERE email = ?',
      [email]
    );
    const user = rows[0];
    if (!user) return R.unauthorized(res, 'Email hoặc mật khẩu không đúng');
    if (user.status === 'banned') return R.forbidden(res, 'Tài khoản đã bị khoá');

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return R.unauthorized(res, 'Email hoặc mật khẩu không đúng');

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    const { password_hash, ...safeUser } = user;
    return R.success(res, { token, user: safeUser }, 'Đăng nhập thành công');
  } catch (err) {
    return R.error(res, 'Đăng nhập thất bại', 500, err);
  }
};

// GET /api/auth/me
const me = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, username, email, avatar_url, role, badge, balance, pending_balance, status FROM users WHERE id = ?',
      [req.user.id]
    );
    if (!rows[0]) return R.notFound(res, 'User không tồn tại');
    return R.success(res, rows[0]);
  } catch (err) {
    return R.error(res, 'Không thể lấy thông tin user', 500, err);
  }
};

module.exports = { register, login, me };
