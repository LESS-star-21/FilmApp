import { z } from 'zod';

export const createFilmSchema = z.object({
    title:  z.string().min(1, 'El título es requerido'),
    year:   z.number().min(1888, 'Año inválido').max(new Date().getFullYear() + 1),
    genre:  z.string().min(1, 'El género es requerido'),
    type:   z.enum(['movie', 'series']),
    status: z.enum(['watched', 'pending']).optional(),
    rating: z.number().min(1).max(5).optional(),
    review: z.string().max(1000).optional(),
});

export const updateFilmSchema = z.object({
    title:  z.string().min(1).optional(),
    year:   z.number().min(1888).optional(),
    genre:  z.string().min(1).optional(),
    type:   z.enum(['movie', 'series']).optional(),
    status: z.enum(['watched', 'pending']).optional(),
    rating: z.number().min(1).max(5).optional(),
    review: z.string().max(1000).optional(),
});

export type CreateFilmDto = z.infer<typeof createFilmSchema>;
export type UpdateFilmDto = z.infer<typeof updateFilmSchema>;