import { Router } from 'express';
import {
  getVouchers,
  redeemVoucher,
  getUserVouchers,
} from '../controllers/voucherController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', getVouchers);
router.post('/redeem', authenticate, redeemVoucher);
router.get('/user/:userId', authenticate, getUserVouchers);

export default router;

