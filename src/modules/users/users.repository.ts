import { User, IUser } from './users.model';

export class UsersRepository {

    async create(data: Partial<IUser>): Promise<IUser> {
        return User.create(data);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    async findAll(): Promise<IUser[]> {
        return User.find({ isActive: true });
    }

    async findById(id: string): Promise<IUser | null> {
        return User.findById(id);
    }
}