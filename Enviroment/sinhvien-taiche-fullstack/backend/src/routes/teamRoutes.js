import { Router } from 'express';
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/teamController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getTeamMembers);
router.post('/', authenticate, authorize('admin'), createTeamMember);
router.put('/:id', authenticate, authorize('admin'), updateTeamMember);
router.delete('/:id', authenticate, authorize('admin'), deleteTeamMember);

export default router;

