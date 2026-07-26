import { Router } from 'express';
import { submitRecycling, getRecyclingHistory, getLeaderboard } from '../controllers/recyclingController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// All recycling routes require authentication
router.post('/submit', authenticate, submitRecycling);
router.get('/history', authenticate, getRecyclingHistory);
router.get('/leaderboard', getLeaderboard); // Public leaderboard

export default router;
