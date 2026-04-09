import { UsersRepository } from './users.repository';
import { CreateUserDto } from './users.schema';
import { hashPassword } from '../../libs/bcrypt';

export class UsersService {
    private repository = new UsersRepository();

    async register(data: CreateUserDto) {
        const exists = await this.repository.findByEmail(data.email);
        if (exists) throw new Error('El usuario ya existe');

        const hashed = await hashPassword(data.password);
        return this.repository.create({ ...data, password: hashed });
    }

    async findAllUsers() {
        return this.repository.findAll();
    }
}