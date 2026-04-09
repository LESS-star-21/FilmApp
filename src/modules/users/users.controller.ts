import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';

export class UsersController {
    private usersService = new UsersService();

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.usersService.register(req.body);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    findAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.usersService.findAllUsers();
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}

