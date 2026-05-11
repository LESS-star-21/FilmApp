import { z } from 'zod';

export const createDirectorSchema = z.object({
    name:        z.string().min(1, 'El nombre es requerido'),
    nationality: z.string().optional(),
    birthDate:   z.string().datetime().optional(),
    biography:   z.string().max(1000).optional(),
});

export const updateDirectorSchema = z.object({
    name:        z.string().min(1).optional(),
    nationality: z.string().optional(),
    birthDate:   z.string().datetime().optional(),
    biography:   z.string().max(1000).optional(),
});

export type CreateDirectorDto = z.infer<typeof createDirectorSchema>;
export type UpdateDirectorDto = z.infer<typeof updateDirectorSchema>;