/**
 * OTP Verification Service
 * Supports: Email verification for register, Phone/Email verification for schedule
 */

import crypto from 'crypto';
import pool from '../config/database.js';
import logger from '../utils/logger.js';
import { sendOTPEmail } from '../jobs/emailQueue.js';

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 10;

/**
 * Generate a random OTP code
 */
export const generateOTPCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Send OTP to email
 */
export const sendOTP = async (email, purpose, referenceId = null, phone = null) => {
  const otpCode = generateOTPCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  // Invalidate old OTPs for same email + purpose
  await pool.query(
    `UPDATE otps SET is_verified = false, expires_at = NOW() 
     WHERE email = $1 AND purpose = $2 AND is_verified = false`,
    [email, purpose]
  );

  // Insert new OTP
  await pool.query(
    `INSERT INTO otps (email, phone, otp_code, purpose, reference_id, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [email, phone, otpCode, purpose, referenceId, expiresAt]
  );

  // Send OTP via email
  try {
    if (purpose === 'register') {
      sendOTPEmail(email, otpCode, 'Xác thực đăng ký tài khoản');
    } else if (purpose === 'schedule') {
      sendOTPEmail(email, otpCode, 'Xác thực đặt lịch thu gom');
    } else if (purpose === 'reset_password') {
      sendOTPEmail(email, otpCode, 'Đặt lại mật khẩu');
    } else if (purpose === 'verify_phone') {
      // For SMS integration in future
      logger.info(`[SMS] OTP ${otpCode} sent to phone: ${phone}`);
    }
  } catch (error) {
    logger.warn(`Failed to send OTP email to ${email}: ${error.message}`);
  }

  logger.info(`OTP sent to ${email} for purpose: ${purpose}`);

  // Return masked email for display
  const maskedEmail = email.replace(/(.{2})(.*)(?=@)/, (_, first, rest) => 
    first + '*'.repeat(rest.length)
  );

  return {
    message: `Mã OTP đã được gửi đến ${maskedEmail}. Vui lòng kiểm tra email.`,
    expiresInMinutes: OTP_EXPIRY_MINUTES,
  };
};

/**
 * Verify OTP code
 */
export const verifyOTP = async (email, otpCode, purpose) => {
  // Find valid OTP
  const result = await pool.query(
    `SELECT * FROM otps 
     WHERE email = $1 
       AND otp_code = $2 
       AND purpose = $3 
       AND is_verified = false 
       AND expires_at > NOW()
     ORDER BY created_at DESC 
     LIMIT 1`,
    [email, otpCode, purpose]
  );

  if (result.rows.length === 0) {
    // Check if OTP existed but expired
    const expiredResult = await pool.query(
      `SELECT id FROM otps 
       WHERE email = $1 AND purpose = $2 AND expires_at <= NOW()
       LIMIT 1`,
      [email, purpose]
    );

    if (expiredResult.rows.length > 0) {
      return { success: false, message: 'Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.' };
    }

    return { success: false, message: 'Mã OTP không hợp lệ.' };
  }

  const otp = result.rows[0];

  // Mark OTP as verified
  await pool.query(
    'UPDATE otps SET is_verified = true WHERE id = $1',
    [otp.id]
  );

  return {
    success: true,
    message: 'Xác thực OTP thành công.',
    referenceId: otp.reference_id,
  };
};

/**
 * Resend OTP
 */
export const resendOTP = async (email, purpose) => {
  return await sendOTP(email, purpose);
};

/**
 * Check if email has been verified for a specific purpose
 */
export const isOTPVerified = async (email, purpose) => {
  const result = await pool.query(
    `SELECT COUNT(*) as count FROM otps 
     WHERE email = $1 
       AND purpose = $2 
       AND is_verified = true
       AND created_at > NOW() - INTERVAL '30 minutes'`,
    [email, purpose]
  );

  return parseInt(result.rows[0].count) > 0;
};

export default {
  sendOTP,
  verifyOTP,
  resendOTP,
  isOTPVerified,
};

