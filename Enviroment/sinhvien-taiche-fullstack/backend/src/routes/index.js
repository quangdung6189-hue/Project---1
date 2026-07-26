import { Router } from 'express';
import scheduleRoutes from './scheduleRoutes.js';
import articleRoutes from './articleRoutes.js';
import teamRoutes from './teamRoutes.js';
import partnerRoutes from './partnerRoutes.js';
import voucherRoutes from './voucherRoutes.js';
import authRoutes from './authRoutes.js';
import recyclingRoutes from './recyclingRoutes.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Mount routes
router.use('/schedules', scheduleRoutes);
router.use('/articles', articleRoutes);
router.use('/team', teamRoutes);
router.use('/partners', partnerRoutes);
router.use('/vouchers', voucherRoutes);
router.use('/auth', authRoutes);
router.use('/recycling', recyclingRoutes);

export default router;

