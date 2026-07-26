import logger from '../utils/logger.js';
import { formatResponse } from '../utils/helpers.js';
import { env } from '../config/index.js';

export class AppError extends Error {
  constructor(code, message, statusCode = 500, details = null) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFoundHandler = (req, res, next) => {
  res.status(404).json(formatResponse(false, null, `Route ${req.originalUrl} không tồn tại.`, 404));
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Lỗi máy chủ nội bộ.';
  let errorCode = err.code || 'INTERNAL_ERROR';
  let details = err.details || null;

  // Log error
  if (statusCode >= 500) {
    logger.error('Server Error', {
      code: errorCode,
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
    });
  } else {
    logger.warn('Client Error', {
      code: errorCode,
      message: err.message,
      url: req.originalUrl,
      method: req.method,
    });
  }

  // PostgreSQL unique violation
  if (err.code === '23505') {
    statusCode = 409;
    errorCode = 'DUPLICATE_ENTRY';
    message = 'Dữ liệu đã tồn tại.';
  }

  // PostgreSQL foreign key violation
  if (err.code === '23503') {
    statusCode = 400;
    errorCode = 'FK_VIOLATION';
    message = 'Dữ liệu tham chiếu không tồn tại.';
  }

  const response = {
    success: false,
    statusCode,
    error: {
      code: errorCode,
      message,
    },
  };

  if (details) {
    response.error.details = details;
  }

  if (env.nodeEnv !== 'production') {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

