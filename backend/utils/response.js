const success = (res, data = null, message = 'OK', statusCode = 200) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const created = (res, data = null, message = 'Created successfully') => {
  return success(res, data, message, 201);
};

const error = (res, message = 'Internal Server Error', statusCode = 500, err = null) => {
  const body = { success: false, message };
  if (process.env.NODE_ENV !== 'production' && err) body.error = err.message || err;
  return res.status(statusCode).json(body);
};

const notFound = (res, message = 'Resource not found') => error(res, message, 404);
const badRequest = (res, message = 'Bad request')       => error(res, message, 400);
const unauthorized = (res, message = 'Unauthorized')    => error(res, message, 401);
const forbidden = (res, message = 'Forbidden')          => error(res, message, 403);

module.exports = { success, created, error, notFound, badRequest, unauthorized, forbidden };
