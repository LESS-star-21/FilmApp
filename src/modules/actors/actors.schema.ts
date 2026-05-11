import { z } from 'zod';

export const createActorSchema = z.object({
    name:        z.string().min(1, 'El nombre es requerido'),
    nationality: z.string().optional(),
    birthDate:   z.string().datetime().optional(),
    biography:   z.string().max(1000).optional(),
});

export const updateActorSchema = z.object({
    name:        z.string().min(1).optional(),
    nationality: z.string().optional(),
    birthDate:   z.string().datetime().optional(),
    biography:   z.string().max(1000).optional(),
});

export type CreateActorDto = z.infer<typeof createActorSchema>;
export type UpdateActorDto = z.infer<typeof updateActorSchema>;