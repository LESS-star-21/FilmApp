import { Router } from 'express';
import { ListsController } from './lists.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createListSchema, updateListSchema, addFilmSchema } from './lists.schema';

const router = Router();
const listsController = new ListsController();

router.post('/',                    authMiddleware, validate(createListSchema), listsController.create);
router.get('/',                     authMiddleware, listsController.findAll);
router.get('/:id',                  authMiddleware, listsController.findById);
router.put('/:id',                  authMiddleware, validate(updateListSchema), listsController.update);
router.post('/:id/films',           authMiddleware, validate(addFilmSchema), listsController.addFilm);
router.delete('/:id/films',         authMiddleware, validate(addFilmSchema), listsController.removeFilm);
router.delete('/:id',               authMiddleware, listsController.delete);

export default router;