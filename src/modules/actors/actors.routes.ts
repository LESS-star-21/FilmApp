import { Router } from 'express';
import { ActorsController } from './actors.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createActorSchema, updateActorSchema } from './actors.schema';

const router = Router();
const actorsController = new ActorsController();

router.post('/',      authMiddleware, validate(createActorSchema), actorsController.create);
router.get('/',       authMiddleware, actorsController.findAll);
router.get('/:id',    authMiddleware, actorsController.findById);
router.put('/:id',    authMiddleware, validate(updateActorSchema), actorsController.update);
router.delete('/:id', authMiddleware, actorsController.delete);

export default router;