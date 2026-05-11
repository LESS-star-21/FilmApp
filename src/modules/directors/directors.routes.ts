import { Router } from 'express';
import { DirectorsController } from './directors.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createDirectorSchema, updateDirectorSchema } from './directors.schema';

const router = Router();
const directorsController = new DirectorsController();

router.post('/',      authMiddleware, validate(createDirectorSchema), directorsController.create);
router.get('/',       authMiddleware, directorsController.findAll);
router.get('/:id',    authMiddleware, directorsController.findById);
router.put('/:id',    authMiddleware, validate(updateDirectorSchema), directorsController.update);
router.delete('/:id', authMiddleware, directorsController.delete);

export default router;