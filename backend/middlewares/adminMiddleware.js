const { forbidden } = require('../utils/response');

const adminMiddleware = (req, res, next) => {
  if (!req.user) return forbidden(res, 'Không có quyền truy cập');
  if (req.user.role !== 'admin') {
    return forbidden(res, 'Chỉ Admin mới có quyền thực hiện thao tác này');
  }
  next();
};

module.exports = adminMiddleware;
