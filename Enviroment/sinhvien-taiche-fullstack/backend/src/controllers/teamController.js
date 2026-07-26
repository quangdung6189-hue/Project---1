import pool from '../config/database.js';
import { formatResponse } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';

export const getTeamMembers = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM team_members ORDER BY display_order ASC, created_at ASC'
    );
    res.json(formatResponse(true, result.rows));
  } catch (error) {
    next(error);
  }
};

export const createTeamMember = async (req, res, next) => {
  try {
    const { name, role, description, icon, specialization, displayOrder, isMentor } = req.body;
    const result = await pool.query(
      `INSERT INTO team_members (name, role, description, icon, specialization, display_order, is_mentor)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, role, description, icon, specialization, displayOrder || 0, isMentor || false]
    );
    res.status(201).json(formatResponse(true, result.rows[0], 'Thành viên đã được thêm.', 201));
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role, description, icon, specialization, displayOrder, isMentor } = req.body;
    
    const result = await pool.query(
      `UPDATE team_members SET
        name = COALESCE($1, name),
        role = COALESCE($2, role),
        description = COALESCE($3, description),
        icon = COALESCE($4, icon),
        specialization = COALESCE($5, specialization),
        display_order = COALESCE($6, display_order),
        is_mentor = COALESCE($7, is_mentor)
       WHERE id = $8 RETURNING *`,
      [name, role, description, icon, specialization, displayOrder, isMentor, id]
    );

    if (result.rows.length === 0) {
      throw new AppError('Không tìm thấy thành viên.', 404);
    }

    res.json(formatResponse(true, result.rows[0], 'Cập nhật thành viên thành công.'));
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM team_members WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      throw new AppError('Không tìm thấy thành viên.', 404);
    }

    res.json(formatResponse(true, null, 'Xóa thành viên thành công.'));
  } catch (error) {
    next(error);
  }
};

