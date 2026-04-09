import { AuthRepository } from './auth.repository';
import { hashPassword, comparePassword } from '../../libs/bcrypt';
import { signToken } from '../../libs/jwt';
import { RegisterDto, LoginDto } from './auth.schema';

export class AuthService {
    private repository = new AuthRepository();

    async register(data: RegisterDto) {
        const exists = await this.repository.findByEmail(data.email);
        if (exists) throw new Error('El usuario ya existe');

        const hashed = await hashPassword(data.password);

        const user = await this.repository.create({
            ...data,
            password: hashed,
            role: 'user',
            isActive: true,
        });

        const token = signToken({
            sub: user._id!.toString(),
            email: user.email,
            role: user.role,
        });

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }

    async login(data: LoginDto) {
        const user = await this.repository.findByEmail(data.email);
        if (!user) throw new Error('Credenciales inválidas');

        const isValid = await comparePassword(data.password, user.password);
        if (!isValid) throw new Error('Credenciales inválidas');

        const token = signToken({
            sub: user._id!.toString(),
            email: user.email,
            role: user.role,
        });

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }
}