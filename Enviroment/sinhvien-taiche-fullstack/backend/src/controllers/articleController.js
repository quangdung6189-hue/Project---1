import pool from '../config/database.js';
import { formatResponse, paginate, paginationMeta, slugify } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';

export const getArticles = async (req, res, next) => {
  try {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { category, featured } = req.query;

    let query = 'SELECT * FROM articles WHERE is_published = true';
    let countQuery = "SELECT COUNT(*) FROM articles WHERE is_published = true";
    const params = [];
    const countParams = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND category = $${paramIndex}`;
      countQuery += ` AND category = $${paramIndex}`;
      params.push(category);
      countParams.push(category);
      paramIndex++;
    }

    if (featured === 'true') {
      query += ` AND is_featured = true`;
      countQuery += ` AND is_featured = true`;
    }

    query += ' ORDER BY published_at DESC NULLS LAST';
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const [dataResult, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, countParams),
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

export const getArticleBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      'SELECT * FROM articles WHERE slug = $1 AND is_published = true',
      [slug]
    );

    if (result.rows.length === 0) {
      throw new AppError('Không tìm thấy bài viết.', 404);
    }

    res.json(formatResponse(true, result.rows[0]));
  } catch (error) {
    next(error);
  }
};

export const createArticle = async (req, res, next) => {
  try {
    const { title, slug: customSlug, excerpt, content, category, author_id, is_featured, is_published } = req.validatedBody || req.body;
    const slug = customSlug || slugify(title);

    const result = await pool.query(
      `INSERT INTO articles (title, slug, excerpt, content, category, author_id, is_featured, is_published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [title, slug, excerpt, content, category, author_id || req.user?.id, is_featured || false, is_published || false, is_published ? new Date() : null]
    );

    res.status(201).json(formatResponse(true, result.rows[0], 'Bài viết đã được tạo.', 201));
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json(formatResponse(false, null, 'Bài viết với tiêu đề này đã tồn tại.', 409));
    }
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, slug: customSlug, excerpt, content, category, author_id, is_featured, is_published } = req.validatedBody || req.body;

    const result = await pool.query(
      `UPDATE articles SET 
        title = COALESCE($1, title),
        slug = COALESCE($2, slug),
        excerpt = COALESCE($3, excerpt),
        content = COALESCE($4, content),
        category = COALESCE($5, category),
        author_id = COALESCE($6, author_id),
        is_featured = COALESCE($7, is_featured),
        is_published = COALESCE($8, is_published),
        published_at = CASE WHEN $8 = true AND published_at IS NULL THEN NOW() ELSE published_at END,
        updated_at = NOW()
       WHERE id = $9 RETURNING *`,
      [title, customSlug, excerpt, content, category, author_id, is_featured, is_published, id]
    );

    if (result.rows.length === 0) {
      throw new AppError('ARTICLE_NOT_FOUND', 'Không tìm thấy bài viết.', 404);
    }

    res.json(formatResponse(true, result.rows[0], 'Cập nhật bài viết thành công.'));
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM articles WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      throw new AppError('ARTICLE_NOT_FOUND', 'Không tìm thấy bài viết.', 404);
    }

    res.json(formatResponse(true, null, 'Xóa bài viết thành công.'));
  } catch (error) {
    next(error);
  }
};

