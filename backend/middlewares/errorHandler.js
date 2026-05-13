const { error } = require('../utils/response');

// Global error handler — must be registered LAST in Express
const errorHandler = (err, req, res, next) => {
  console.error('🔴 Unhandled error:', err);
  const statusCode = err.statusCode || 500;
  const message    = err.message    || 'Internal Server Error';
  return error(res, message, statusCode, err);
};

module.exports = errorHandler;
