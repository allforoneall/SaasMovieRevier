import { Router } from 'express';
import { getReviews, addReview, updateReview, deleteReview } from '../controllers/reviewController';

const router = Router();

router.get('/:movieId', getReviews);
router.post('/', addReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
