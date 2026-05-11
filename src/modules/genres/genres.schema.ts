import { z } from 'zod';

export const createGenreSchema = z.object({
    name:        z.string().min(1, 'El nombre es requerido'),
    description: z.string().max(500).optional(),
});

export const updateGenreSchema = z.object({
    name:        z.string().min(1).optional(),
    description: z.string().max(500).optional(),
});

export type CreateGenreDto = z.infer<typeof createGenreSchema>;
export type UpdateGenreDto = z.infer<typeof updateGenreSchema>;