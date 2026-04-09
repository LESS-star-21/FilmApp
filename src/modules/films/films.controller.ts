import { Response, NextFunction } from 'express';
import { FilmsService } from './films.service';
import { createFilmSchema, updateFilmSchema } from './films.schema';
import { AuthRequest } from '../../shared/types/auth-request';

export class FilmsController {
    private filmsService = new FilmsService();

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const data = createFilmSchema.parse(req.body);
            const userId = req.user?.sub;
            if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });

            const film = await this.filmsService.create(data, userId);
            return res.status(201).json(film);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.sub;
            if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });

            const films = await this.filmsService.findAll(userId);
            return res.status(200).json(films);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const film = await this.filmsService.findById(String(req.params.id));
            return res.status(200).json(film);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const data = updateFilmSchema.parse(req.body);
            const userId = req.user?.sub;
            if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });

            const film = await this.filmsService.update(String(req.params.id), userId, data);
            return res.status(200).json(film);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.sub;
            if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });

            await this.filmsService.delete(String(req.params.id), userId);
            return res.status(200).json({ message: 'Película eliminada correctamente' });
        } catch (error) {
            next(error);
        }
    };

    rate = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { rating, review } = req.body;
            const userId = req.user?.sub;
            if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });

            const film = await this.filmsService.rate(String(req.params.id), userId, rating, review);
            return res.status(200).json(film);
        } catch (error) {
            next(error);
        }
    };
}