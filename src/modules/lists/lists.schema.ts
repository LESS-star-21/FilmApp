import { z } from 'zod';

export const createListSchema = z.object({
    name:        z.string().min(1, 'El nombre es requerido'),
    description: z.string().max(500).optional(),
});

export const updateListSchema = z.object({
    name:        z.string().min(1).optional(),
    description: z.string().max(500).optional(),
});

export const addFilmSchema = z.object({
    filmId: z.string().min(1, 'El filmId es requerido'),
});

export type CreateListDto = z.infer<typeof createListSchema>;
export type UpdateListDto = z.infer<typeof updateListSchema>;
export type AddFilmDto = z.infer<typeof addFilmSchema>;