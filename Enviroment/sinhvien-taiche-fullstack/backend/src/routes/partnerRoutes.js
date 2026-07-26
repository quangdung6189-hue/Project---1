import { Router } from 'express';
import {
  createPartner,
  getPartners,
  approvePartner,
  rejectPartner,
  deletePartner,
} from '../controllers/partnerController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate, partnerSchema } from '../middleware/validation.js';

const router = Router();

router.post('/', validate(partnerSchema), createPartner);
router.get('/', authenticate, authorize('admin', 'moderator'), getPartners);
router.patch('/:id/approve', authenticate, authorize('admin'), approvePartner);
router.patch('/:id/reject', authenticate, authorize('admin'), rejectPartner);
router.delete('/:id', authenticate, authorize('admin'), deletePartner);

export default router;

