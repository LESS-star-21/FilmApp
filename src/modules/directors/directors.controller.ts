import { Request, Response, NextFunction } from 'express';
import { DirectorsService } from './directors.service';
import { createDirectorSchema, updateDirectorSchema } from './directors.schema';

export class DirectorsController {
    private directorsService = new DirectorsService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createDirectorSchema.parse(req.body);
            const director = await this.directorsService.create(data);
            return res.status(201).json(director);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const directors = await this.directorsService.findAll();
            return res.status(200).json(directors);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const director = await this.directorsService.findById(String(req.params.id));
            return res.status(200).json(director);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = updateDirectorSchema.parse(req.body);
            const director = await this.directorsService.update(String(req.params.id), data);
            return res.status(200).json(director);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.directorsService.delete(String(req.params.id));
            return res.status(200).json({ message: 'Director eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    };
}