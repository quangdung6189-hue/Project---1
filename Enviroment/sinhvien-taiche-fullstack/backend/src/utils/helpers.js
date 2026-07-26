/**
 * Format API response
 */
export const formatResponse = (success, data = null, message = '', statusCode = 200) => {
  return {
    success,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Paginate results
 */
export const paginate = (page = 1, limit = 10) => {
  const p = Math.max(1, parseInt(page));
  const l = Math.min(Math.max(1, parseInt(limit)), 100);
  const offset = (p - 1) * l;
  return { page: p, limit: l, offset };
};

/**
 * Generate pagination meta
 */
export const paginationMeta = (page, limit, total) => {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  };
};

/**
 * Sanitize object - remove specified keys
 */
export const sanitize = (obj, keys = []) => {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
};

/**
 * Generate slug from string
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

