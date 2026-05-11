import { Request, Response, NextFunction } from 'express';
import { ActorsService } from './actors.service';
import { createActorSchema, updateActorSchema } from './actors.schema';

export class ActorsController {
    private actorsService = new ActorsService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createActorSchema.parse(req.body);
            const actor = await this.actorsService.create(data);
            return res.status(201).json(actor);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const actors = await this.actorsService.findAll();
            return res.status(200).json(actors);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const actor = await this.actorsService.findById(String(req.params.id));
            return res.status(200).json(actor);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = updateActorSchema.parse(req.body);
            const actor = await this.actorsService.update(String(req.params.id), data);
            return res.status(200).json(actor);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.actorsService.delete(String(req.params.id));
            return res.status(200).json({ message: 'Actor eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    };
}