import { Router } from 'express';
import { GenresController } from './genres.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createGenreSchema, updateGenreSchema } from './genres.schema';

const router = Router();
const genresController = new GenresController();

router.post('/',    authMiddleware, validate(createGenreSchema), genresController.create);
router.get('/',     authMiddleware, genresController.findAll);
router.get('/:id',  authMiddleware, genresController.findById);
router.put('/:id',  authMiddleware, validate(updateGenreSchema), genresController.update);
router.delete('/:id', authMiddleware, genresController.delete);

export default router;