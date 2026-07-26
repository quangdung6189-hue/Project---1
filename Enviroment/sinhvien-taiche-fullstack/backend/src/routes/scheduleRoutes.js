import { Router } from 'express';
import {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateScheduleStatus,
  deleteSchedule,
} from '../controllers/scheduleController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate, pickupSchema } from '../middleware/validation.js';

const router = Router();

router.post('/', validate(pickupSchema), createSchedule);
router.get('/', authenticate, authorize('admin', 'moderator'), getAllSchedules);
router.get('/:id', authenticate, getScheduleById);
router.patch('/:id/status', authenticate, authorize('admin', 'moderator'), updateScheduleStatus);
router.delete('/:id', authenticate, authorize('admin'), deleteSchedule);

export default router;

