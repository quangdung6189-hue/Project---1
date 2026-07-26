import { z } from 'zod';
import { formatResponse } from '../utils/helpers.js';

/**
 * Validate request body against a Zod schema
 */
export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req.body);
      req.validatedBody = parsed;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return res.status(400).json(
          formatResponse(false, null, 'Dữ liệu không hợp lệ.', 400)
        );
      }
      next(error);
    }
  };
};

// === Validation Schemas (snake_case keys for DB) ===

export const pickupSchema = z.object({
  contact_name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(100),
  contact_phone: z.string().min(8, 'Số điện thoại không hợp lệ').max(15),
  contact_email: z.string().email('Email không hợp lệ'),
  waste_type: z.string().min(1, 'Vui lòng chọn loại rác'),
  estimated_weight_kg: z.number().positive('Khối lượng phải lớn hơn 0').max(1000),
  collection_address: z.string().min(1, 'Vui lòng nhập địa chỉ'),
  note: z.string().max(500).optional().default(''),
  user_id: z.string().uuid().optional().nullable(),
});

export const volunteerSchema = z.object({
  contact_name: z.string().min(2).max(100),
  contact_email: z.string().email(),
  contact_phone: z.string().min(8).max(15),
  waste_type: z.string().min(1),
  note: z.string().min(10, 'Ghi chú phải có ít nhất 10 ký tự').max(1000),
});

export const partnerSchema = z.object({
  company_name: z.string().min(2).max(200),
  contact_name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(8).max(15),
  partner_type: z.enum(['recycler', 'sponsor', 'logistics', 'educational', 'collection_unit', 'recycling_factory', 'other']),
  address: z.string().max(500).optional().default(''),
  description: z.string().max(2000).optional().default(''),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const registerSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
    .regex(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ thường')
    .regex(/[0-9]/, 'Mật khẩu phải có ít nhất 1 số')
    .regex(/[^A-Za-z0-9]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'),
  full_name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(100),
  phone: z.string().min(8, 'Số điện thoại không hợp lệ').max(15).optional(),
});

export const articleSchema = z.object({
  title: z.string().min(5).max(255),
  slug: z.string().optional(),
  excerpt: z.string().max(500).optional().default(''),
  content: z.string().min(50, 'Nội dung phải có ít nhất 50 ký tự'),
  category: z.string().min(1, 'Vui lòng chọn danh mục'),
  author_id: z.string().uuid().optional().nullable(),
  is_featured: z.boolean().optional().default(false),
  is_published: z.boolean().optional().default(false),
});

export const profileUpdateSchema = z.object({
  full_name: z.string().min(2).max(100).optional(),
  phone: z.string().min(8).max(15).optional(),
  avatar_url: z.string().url().optional().nullable(),
});

// === OTP Schemas ===

export const otpEmailSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

export const otpVerifySchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  otpCode: z.string().length(6, 'Mã OTP phải có 6 chữ số'),
});

export const otpResendSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

