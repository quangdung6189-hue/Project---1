import pool from '../config/database.js';
import logger from '../utils/logger.js';
import { formatResponse, paginate, paginationMeta } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';

export const createPartner = async (req, res, next) => {
  try {
    const { company_name, contact_name, email, phone, partner_type, address, description } = req.validatedBody;
    
    const result = await pool.query(
      `INSERT INTO partners (company_name, contact_name, email, phone, partner_type, address, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [company_name, contact_name, email, phone, partner_type, address, description]
    );

    logger.info(`New partner registration: ${result.rows[0].id}`);
    
    res.status(201).json(formatResponse(true, result.rows[0], 'Đăng ký đối tác thành công!', 201));
  } catch (error) {
    next(error);
  }
};

export const getPartners = async (req, res, next) => {
  try {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { type, status } = req.query;

    let query = 'SELECT * FROM partners WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) FROM partners WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (type) {
      query += ` AND partner_type = $${paramIndex}`;
      countQuery += ` AND partner_type = $${paramIndex}`;
      params.push(type);
      paramIndex++;
    }

    if (status === 'approved') {
      query += " AND status = 'approved'";
      countQuery += " AND status = 'approved'";
    } else if (status === 'pending') {
      query += " AND status = 'pending'";
      countQuery += " AND status = 'pending'";
    } else if (status === 'rejected') {
      query += " AND status = 'rejected'";
      countQuery += " AND status = 'rejected'";
    }

    query += ' ORDER BY created_at DESC';
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const [dataResult, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery),
    ]);

    const total = parseInt(countResult.rows[0].count);

    res.json(formatResponse(true, {
      data: dataResult.rows,
      pagination: paginationMeta(page, limit, total),
    }));
  } catch (error) {
    next(error);
  }
};

export const approvePartner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE partners SET status = 'approved', updated_at = NOW() WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      throw new AppError('PARTNER_NOT_FOUND', 'Không tìm thấy đối tác.', 404);
    }

    res.json(formatResponse(true, result.rows[0], 'Đối tác đã được phê duyệt.'));
  } catch (error) {
    next(error);
  }
};

export const rejectPartner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE partners SET status = 'rejected', updated_at = NOW() WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      throw new AppError('PARTNER_NOT_FOUND', 'Không tìm thấy đối tác.', 404);
    }

    res.json(formatResponse(true, result.rows[0], 'Đối tác đã bị từ chối.'));
  } catch (error) {
    next(error);
  }
};

export const deletePartner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM partners WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      throw new AppError('Không tìm thấy đối tác.', 404);
    }

    res.json(formatResponse(true, null, 'Xóa đối tác thành công.'));
  } catch (error) {
    next(error);
  }
};

