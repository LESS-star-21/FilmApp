import { z } from 'zod';

export const createUserSchema = z.object({
    name:     z.string().min(4, 'El nombre debe tener mínimo 4 caracteres'),
    email:    z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener mínimo 6 caracteres'),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;