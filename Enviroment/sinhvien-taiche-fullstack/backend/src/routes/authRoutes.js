import { Router } from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  addEcoPoints,
  sendRegisterOTP,
  verifyRegisterOTP,
  resendRegisterOTP,
  sendScheduleOTP,
  verifyScheduleOTP,
} from '../controllers/authController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate, loginSchema, registerSchema, profileUpdateSchema, otpEmailSchema } from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// OTP routes (before register)
router.post('/send-otp', authLimiter, validate(otpEmailSchema), sendRegisterOTP);
router.post('/verify-otp', authLimiter, verifyRegisterOTP);
router.post('/resend-otp', authLimiter, validate(otpEmailSchema), resendRegisterOTP);

// OTP for schedule
router.post('/send-schedule-otp', authLimiter, sendScheduleOTP);
router.post('/verify-schedule-otp', authLimiter, verifyScheduleOTP);

// Auth routes
router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validate(profileUpdateSchema), updateProfile);
router.post('/eco-points', authenticate, authorize('admin'), addEcoPoints);

export default router;

