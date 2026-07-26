import { Router } from 'express';
import {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getArticles);
router.get('/:slug', getArticleBySlug);
router.post('/', authenticate, authorize('admin', 'moderator'), createArticle);
router.put('/:id', authenticate, authorize('admin', 'moderator'), updateArticle);
router.delete('/:id', authenticate, authorize('admin'), deleteArticle);

export default router;

