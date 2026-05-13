const jwt = require('jsonwebtoken');
const { unauthorized } = require('../utils/response');

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return unauthorized(res, 'Vui lòng đăng nhập để tiếp tục');
  }
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, email, role }
    next();
  } catch (err) {
    return unauthorized(res, 'Token không hợp lệ hoặc đã hết hạn');
  }
};

module.exports = authMiddleware;
