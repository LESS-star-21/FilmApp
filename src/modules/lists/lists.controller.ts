import { Response, NextFunction } from 'express';
import { ListsService } from './lists.service';
import { createListSchema, updateListSchema, addFilmSchema } from './lists.schema';
import { AuthRequest } from '../../shared/types/auth-request';

export class ListsController {
    private listsService = new ListsService();

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const data = createListSchema.parse(req.body);
            const userId = req.user?.sub;
            if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });
            const list = await this.listsService.create(data, userId);
            return res.status(201).json(list);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.sub;
            if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });
            const lists = await this.listsService.findAll(userId);
            return res.status(200).json(lists);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const list = await this.listsService.findById(String(req.params.id));
            return res.status(200).json(list);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const data = updateListSchema.parse(req.body);
            const userId = req.user?.sub;
            if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });
            const list = await this.listsService.update(String(req.params.id), userId, data);
            return res.status(200).json(list);
        } catch (error) {
            next(error);
        }
    };

    addFilm = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { filmId } = addFilmSchema.parse(req.body);
            const userId = req.user?.sub;
            if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });
            const list = await this.listsService.addFilm(String(req.params.id), userId, filmId);
            return res.status(200).json(list);
        } catch (error) {
            next(error);
        }
    };

    removeFilm = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { filmId } = addFilmSchema.parse(req.body);
            const userId = req.user?.sub;
            if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });
            const list = await this.listsService.removeFilm(String(req.params.id), userId, filmId);
            return res.status(200).json(list);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.sub;
            if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });
            await this.listsService.delete(String(req.params.id), userId);
            return res.status(200).json({ message: 'Lista eliminada correctamente' });
        } catch (error) {
            next(error);
        }
    };
}