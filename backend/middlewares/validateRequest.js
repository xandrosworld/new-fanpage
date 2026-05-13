const { badRequest } = require('../utils/response');

/**
 * validateRequest(fields)
 * fields: array of required field names in req.body
 */
const validateRequest = (fields = []) => (req, res, next) => {
  const missing = fields.filter(f => {
    const val = req.body[f];
    return val === undefined || val === null || val === '';
  });
  if (missing.length > 0) {
    return badRequest(res, `Thiếu trường bắt buộc: ${missing.join(', ')}`);
  }
  next();
};

module.exports = validateRequest;
