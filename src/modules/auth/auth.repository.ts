import { User, IUser } from '../users/users.model';

export class AuthRepository {

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    async create(data: Partial<IUser>): Promise<IUser> {
        return User.create(data);
    }
}