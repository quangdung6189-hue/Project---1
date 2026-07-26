import crypto from 'crypto';
import pool from '../config/database.js';
import { formatResponse } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';

function generateRedeemCode(prefix) {
  const suffix = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${suffix}`;
}

export const getVouchers = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM vouchers WHERE is_active = true AND expires_at > NOW() AND remaining_stock > 0 ORDER BY points_required ASC'
    );
    res.json(formatResponse(true, result.rows));
  } catch (error) {
    next(error);
  }
};

export const redeemVoucher = async (req, res, next) => {
  try {
    const { userId, voucherId } = req.body;
    const actualUserId = userId || req.user?.id;

    if (!actualUserId) {
      throw new AppError('MISSING_USER', 'Vui lòng cung cấp thông tin người dùng.', 400);
    }

    // Check voucher availability with pessimistic locking
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const voucherResult = await client.query(
        'SELECT * FROM vouchers WHERE id = $1 AND is_active = true AND expires_at > NOW() AND remaining_stock > 0 FOR UPDATE',
        [voucherId]
      );

      if (voucherResult.rows.length === 0) {
        throw new AppError('VOUCHER_UNAVAILABLE', 'Voucher không khả dụng hoặc đã hết hàng.', 400);
      }

      const voucher = voucherResult.rows[0];

      // Check user points
      const userResult = await client.query(
        'SELECT eco_points FROM users WHERE id = $1 FOR UPDATE',
        [actualUserId]
      );

      if (userResult.rows.length === 0) {
        throw new AppError('USER_NOT_FOUND', 'Không tìm thấy người dùng.', 404);
      }

      const user = userResult.rows[0];

      if (user.eco_points < voucher.points_required) {
        throw new AppError('INSUFFICIENT_POINTS', `Bạn cần ${voucher.points_required} điểm Eco để đổi voucher này.`, 400);
      }

      // Generate unique redeem code
      const redeemCode = generateRedeemCode(voucher.code_prefix);

      // Deduct points and decrease stock
      await client.query(
        'UPDATE users SET eco_points = eco_points - $1 WHERE id = $2',
        [voucher.points_required, actualUserId]
      );

      await client.query(
        'UPDATE vouchers SET remaining_stock = remaining_stock - 1 WHERE id = $1',
        [voucherId]
      );

      const redemption = await client.query(
        `INSERT INTO user_vouchers (user_id, voucher_id, redeem_code) VALUES ($1, $2, $3) RETURNING *`,
        [actualUserId, voucherId, redeemCode]
      );

      await client.query('COMMIT');

      res.status(201).json(
        formatResponse(true, {
          redemption: redemption.rows[0],
          voucher: { ...voucher, remaining_stock: voucher.remaining_stock - 1 },
        }, 'Đổi voucher thành công!', 201)
      );
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    next(error);
  }
};

export const getUserVouchers = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const actualUserId = userId || req.user?.id;

    const result = await pool.query(
      `SELECT uv.*, v.title, v.description, v.icon, v.points_required, v.code_prefix
       FROM user_vouchers uv
       JOIN vouchers v ON uv.voucher_id = v.id
       WHERE uv.user_id = $1
       ORDER BY uv.redeemed_at DESC`,
      [actualUserId]
    );
    res.json(formatResponse(true, result.rows));
  } catch (error) {
    next(error);
  }
};

