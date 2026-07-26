import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';
import { env } from '../config/index.js';
import logger from '../utils/logger.js';
import { formatResponse, sanitize } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';
import { sendOTP, verifyOTP, resendOTP, isOTPVerified } from '../services/otpService.js';
import { sendWelcomeEmail } from '../jobs/emailQueue.js';

/**
 * Register a new user (requires OTP verification first)
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, fullName, phone } = req.body;

    // Check if OTP was verified
    const verified = await isOTPVerified(email, 'register');
    if (!verified) {
      throw new AppError('OTP_NOT_VERIFIED', 'Vui lòng xác thực email trước khi đăng ký.', 400);
    }

    // Check if user exists
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      throw new AppError('EMAIL_EXISTS', 'Email này đã được đăng ký.', 409);
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await pool.query(
      `INSERT INTO users (email, password_hash, full_name, phone, status)
       VALUES ($1, $2, $3, $4, 'active') RETURNING id, email, full_name, role, eco_points, created_at`,
      [email, passwordHash, fullName, phone]
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn }
    );

    logger.info(`New user registered: ${user.email}`);

    // Send welcome email
    sendWelcomeEmail(email, fullName);

    res.status(201).json(
      formatResponse(true, { user, token }, 'Đăng ký tài khoản thành công!', 201)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      throw new AppError('INVALID_CREDENTIALS', 'Email hoặc mật khẩu không đúng.', 401);
    }

    const user = result.rows[0];

    if (user.status === 'suspended') {
      throw new AppError('ACCOUNT_SUSPENDED', 'Tài khoản đã bị vô hiệu hóa.', 403);
    }
    if (user.status === 'unverified') {
      throw new AppError('ACCOUNT_UNVERIFIED', 'Tài khoản chưa được xác minh.', 403);
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new AppError('INVALID_CREDENTIALS', 'Email hoặc mật khẩu không đúng.', 401);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn }
    );

    const safeUser = sanitize(user, ['password_hash']);

    res.json(formatResponse(true, { user: safeUser, token }, 'Đăng nhập thành công.'));
  } catch (error) {
    next(error);
  }
};

/**
 * Send OTP for registration
 * POST /api/auth/send-otp
 */
export const sendRegisterOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if email already registered
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      throw new AppError('EMAIL_EXISTS', 'Email này đã được đăng ký.', 409);
    }

    const result = await sendOTP(email, 'register');
    res.json(formatResponse(true, result, result.message));
  } catch (error) {
    next(error);
  }
};

/**
 * Verify OTP for registration
 * POST /api/auth/verify-otp
 */
export const verifyRegisterOTP = async (req, res, next) => {
  try {
    const { email, otpCode } = req.body;
    const result = await verifyOTP(email, otpCode, 'register');

    if (!result.success) {
      throw new AppError('OTP_INVALID', result.message, 400);
    }

    res.json(formatResponse(true, null, result.message));
  } catch (error) {
    next(error);
  }
};

/**
 * Resend OTP for registration
 * POST /api/auth/resend-otp
 */
export const resendRegisterOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await resendOTP(email, 'register');
    res.json(formatResponse(true, result, result.message));
  } catch (error) {
    next(error);
  }
};

/**
 * Send OTP for schedule verification
 * POST /api/auth/send-schedule-otp
 */
export const sendScheduleOTP = async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    const result = await sendOTP(email, 'schedule', null, phone);
    res.json(formatResponse(true, result, result.message));
  } catch (error) {
    next(error);
  }
};

/**
 * Verify OTP for schedule
 * POST /api/auth/verify-schedule-otp
 */
export const verifyScheduleOTP = async (req, res, next) => {
  try {
    const { email, otpCode } = req.body;
    const result = await verifyOTP(email, otpCode, 'schedule');

    if (!result.success) {
      throw new AppError('OTP_INVALID', result.message, 400);
    }

    res.json(formatResponse(true, { verified: true }, result.message));
  } catch (error) {
    next(error);
  }
};

/**
 * Get user profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, email, full_name, phone, role, avatar_url, eco_points, status, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      throw new AppError('USER_NOT_FOUND', 'Không tìm thấy người dùng.', 404);
    }

    res.json(formatResponse(true, result.rows[0]));
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { fullName, phone } = req.body;
    const result = await pool.query(
      `UPDATE users SET
        full_name = COALESCE($1, full_name),
        phone = COALESCE($2, phone),
        updated_at = NOW()
       WHERE id = $3 RETURNING id, email, full_name, phone, role, eco_points`,
      [fullName, phone, req.user.id]
    );

    res.json(formatResponse(true, result.rows[0], 'Cập nhật thông tin thành công.'));
  } catch (error) {
    next(error);
  }
};

/**
 * Add EcoPoints (Admin only)
 */
export const addEcoPoints = async (req, res, next) => {
  try {
    const { userId, points } = req.body;
    const result = await pool.query(
      'UPDATE users SET eco_points = eco_points + $1 WHERE id = $2 RETURNING id, eco_points',
      [points, userId]
    );

    if (result.rows.length === 0) {
      throw new AppError('USER_NOT_FOUND', 'Không tìm thấy người dùng.', 404);
    }

    res.json(formatResponse(true, result.rows[0], `Đã cộng ${points} điểm Eco.`));
  } catch (error) {
    next(error);
  }
};

