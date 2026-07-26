import pool from '../config/database.js';
import logger from '../utils/logger.js';
import { formatResponse, paginate, paginationMeta } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';

export const createSchedule = async (req, res, next) => {
  try {
    const { contact_name, contact_phone, contact_email, waste_type, estimated_weight_kg, collection_address, note, user_id } = req.validatedBody || req.body;

    const result = await pool.query(
      `INSERT INTO collection_schedules (user_id, submission_type, contact_name, contact_phone, contact_email, waste_type, estimated_weight_kg, collection_address, note, points_awarded)
       VALUES ($1, 'pickup', $2, $3, $4, $5, $6, $7, $8, 50)
       RETURNING *`,
      [user_id || req.user?.id || null, contact_name, contact_phone, contact_email, waste_type, estimated_weight_kg, collection_address, note]
    );

    logger.info(`New schedule created: ${result.rows[0].id}`);
    
    res.status(201).json(
      formatResponse(true, result.rows[0], 'Đặt lịch thành công!', 201)
    );
  } catch (error) {
    next(error);
  }
};

export const getAllSchedules = async (req, res, next) => {
  try {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { status, type } = req.query;
    
    let query = 'SELECT * FROM collection_schedules WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) FROM collection_schedules WHERE 1=1';
    const params = [];
    const countParams = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND status = $${paramIndex}`;
      countQuery += ` AND status = $${paramIndex}`;
      params.push(status);
      countParams.push(status);
      paramIndex++;
    }

    if (type) {
      query += ` AND submission_type = $${paramIndex}`;
      countQuery += ` AND submission_type = $${paramIndex}`;
      params.push(type);
      countParams.push(type);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const [dataResult, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, countParams),
    ]);

    const total = parseInt(countResult.rows[0].count);

    res.json(
      formatResponse(true, {
        data: dataResult.rows,
        pagination: paginationMeta(page, limit, total),
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getScheduleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM collection_schedules WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      throw new AppError('SCHEDULE_NOT_FOUND', 'Không tìm thấy lịch thu gom.', 404);
    }

    res.json(formatResponse(true, result.rows[0]));
  } catch (error) {
    next(error);
  }
};

export const updateScheduleStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new AppError('Trạng thái không hợp lệ.', 400);
    }

    const result = await pool.query(
      `UPDATE collection_schedules SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      throw new AppError('Không tìm thấy lịch thu gom.', 404);
    }

    res.json(formatResponse(true, result.rows[0], 'Cập nhật trạng thái thành công.'));
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM collection_schedules WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      throw new AppError('Không tìm thấy lịch thu gom.', 404);
    }

    res.json(formatResponse(true, null, 'Xóa lịch thu gom thành công.'));
  } catch (error) {
    next(error);
  }
};

