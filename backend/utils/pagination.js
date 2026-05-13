/**
 * Parse pagination params from query string
 * @returns { page, limit, offset }
 */
const getPagination = (query) => {
  const page  = Math.max(1, parseInt(query.page  || 1, 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || 10, 10)));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

/**
 * Build pagination meta for response
 */
const paginationMeta = (total, page, limit) => ({
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
  hasNext: page * limit < total,
  hasPrev: page > 1,
});

module.exports = { getPagination, paginationMeta };
