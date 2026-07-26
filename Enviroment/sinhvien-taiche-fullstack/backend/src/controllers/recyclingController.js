import pool from '../config/database.js';
import logger from '../utils/logger.js';
import { formatResponse } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';

// Points awarded per waste type
const POINTS_TABLE = {
  plastic: 80,
  paper: 60,
  metal: 100,
  glass: 70,
  electronic: 150,
  organic: 40,
  other: 50,
};

/**
 * Submit a recycling photo to earn EcoPoints
 * POST /api/recycling/submit
 */
export const submitRecycling = async (req, res, next) => {
  try {
    const { wasteType, estimatedWeight, imageUrl, note } = req.body;
    const userId = req.user.id;

    if (!wasteType || !estimatedWeight) {
      throw new AppError('MISSING_FIELDS', 'Vui lòng cung cấp loại rác và khối lượng.', 400);
    }

    const basePoints = POINTS_TABLE[wasteType] || 50;
    // Bonus for heavier loads (up to 3x for 10kg+)
    const weightMultiplier = Math.min(3, Math.max(1, Math.floor(parseFloat(estimatedWeight) / 3)));
    const pointsAwarded = basePoints * weightMultiplier;

    // Insert recycling submission
    const subResult = await pool.query(
      `INSERT INTO recycling_submissions 
         (user_id, waste_type, estimated_weight, image_url, points_awarded, status, note)
       VALUES ($1, $2, $3, $4, $5, 'approved', $6)
       RETURNING *`,
      [userId, wasteType, estimatedWeight, imageUrl || null, pointsAwarded, note || null]
    );

    // Add eco points to user
    const userResult = await pool.query(
      'UPDATE users SET eco_points = eco_points + $1 WHERE id = $2 RETURNING id, eco_points, full_name',
      [pointsAwarded, userId]
    );

    logger.info(`User ${userId} submitted recycling: ${wasteType} ${estimatedWeight}kg → +${pointsAwarded} pts`);

    res.status(201).json(
      formatResponse(true, {
        submission: subResult.rows[0],
        pointsAwarded,
        newTotal: userResult.rows[0].eco_points,
      }, `🎉 Nộp rác thành công! Bạn nhận được +${pointsAwarded} EcoPoints!`, 201)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get recycling history for current user
 * GET /api/recycling/history
 */
export const getRecyclingHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page || '1');
    const limit = parseInt(req.query.limit || '10');
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT * FROM recycling_submissions
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    const countResult = await pool.query(
      'SELECT COUNT(*) as total FROM recycling_submissions WHERE user_id = $1',
      [userId]
    );

    const totalPoints = await pool.query(
      'SELECT COALESCE(SUM(points_awarded), 0) as total FROM recycling_submissions WHERE user_id = $1 AND status = $2',
      [userId, 'approved']
    );

    res.json(
      formatResponse(true, {
        submissions: result.rows,
        pagination: {
          page,
          limit,
          total: parseInt(countResult.rows[0].total),
          pages: Math.ceil(parseInt(countResult.rows[0].total) / limit),
        },
        totalPointsEarned: parseInt(totalPoints.rows[0].total),
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get points leaderboard
 * GET /api/recycling/leaderboard
 */
export const getLeaderboard = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.full_name, u.avatar_url, u.eco_points,
              COUNT(rs.id) as submission_count,
              COALESCE(SUM(rs.estimated_weight), 0) as total_weight_kg
       FROM users u
       LEFT JOIN recycling_submissions rs ON u.id = rs.user_id AND rs.status = 'approved'
       WHERE u.status = 'active'
       GROUP BY u.id, u.full_name, u.avatar_url, u.eco_points
       ORDER BY u.eco_points DESC
       LIMIT 20`
    );

    res.json(formatResponse(true, result.rows));
  } catch (error) {
    next(error);
  }
};
