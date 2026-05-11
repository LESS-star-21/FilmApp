import { Request, Response, NextFunction } from 'express';
import { GenresService } from './genres.service';
import { createGenreSchema, updateGenreSchema } from './genres.schema';

export class GenresController {
    private genresService = new GenresService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createGenreSchema.parse(req.body);
            const genre = await this.genresService.create(data);
            return res.status(201).json(genre);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const genres = await this.genresService.findAll();
            return res.status(200).json(genres);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const genre = await this.genresService.findById(String(req.params.id));
            return res.status(200).json(genre);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = updateGenreSchema.parse(req.body);
            const genre = await this.genresService.update(String(req.params.id), data);
            return res.status(200).json(genre);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.genresService.delete(String(req.params.id));
            return res.status(200).json({ message: 'Género eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    };
}