import { Router } from 'express';
import { FilmsController } from './films.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createFilmSchema, updateFilmSchema } from './films.schema';

const router = Router();
const filmsController = new FilmsController();

router.post('/', authMiddleware, validate(createFilmSchema), filmsController.create);
router.get('/', authMiddleware, filmsController.findAll);
router.get('/:id', authMiddleware, filmsController.findById);
router.put('/:id', authMiddleware, validate(updateFilmSchema), filmsController.update);
router.delete('/:id', authMiddleware, filmsController.delete);
router.patch('/:id/rate', authMiddleware, filmsController.rate);

export default router;