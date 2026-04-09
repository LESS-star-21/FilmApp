import { Router } from 'express';
import { UsersController } from './users.controller';
import { validate } from '../../middlewares/validate.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createUserSchema } from './users.schema';

const router = Router();
const usersController = new UsersController();

router.post('/register', validate(createUserSchema), usersController.register);
router.get('/', authMiddleware, usersController.findAllUsers);

export default router;