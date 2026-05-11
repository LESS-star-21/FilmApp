import { Router } from 'express';
import AuthRouter from '../../modules/auth/auth.routes';
import UsersRouter from '../../modules/users/users.routes';
import FilmsRouter from '../../modules/films/films.routes'; 
import GenresRouter from '../../modules/genres/genres.routes';
import DirectorsRouter from '../../modules/directors/directors.routes';
import ListsRouter from '../../modules/lists/lists.routes';
import ActorsRouter from '../../modules/actors/actors.routes';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/users', UsersRouter);
router.use('/films', FilmsRouter);
router.use('/genres', GenresRouter);
router.use('/directors', DirectorsRouter);
router.use('/lists', ListsRouter);
router.use('/actors', ActorsRouter);

export default router;