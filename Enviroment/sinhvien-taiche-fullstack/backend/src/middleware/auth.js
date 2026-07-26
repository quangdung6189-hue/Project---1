import jwt from 'jsonwebtoken';
import { env } from '../config/index.js';
import { formatResponse } from '../utils/helpers.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(formatResponse(false, null, 'Vui lòng đăng nhập để tiếp tục.', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(formatResponse(false, null, 'Token không hợp lệ hoặc đã hết hạn.', 401));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json(formatResponse(false, null, 'Bạn không có quyền thực hiện hành động này.', 403));
    }
    next();
  };
};

