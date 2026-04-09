import { Router } from 'express';
import AuthRouter from '../../modules/auth/auth.routes';
import UsersRouter from '../../modules/users/users.routes';
import FilmsRouter from '../../modules/films/films.routes';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/users', UsersRouter);
router.use('/films', FilmsRouter);

export default router;