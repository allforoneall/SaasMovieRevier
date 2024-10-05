import { Router } from 'express';
import { addMovie, getMovies, updateMovie, deleteMovie, getMovieById } from '../controllers/movieController';

const router = Router();

router.get('/', getMovies);
router.post('/', addMovie);
router.get('/:id', getMovieById);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
