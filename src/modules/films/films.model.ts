import { Schema, model, Document } from 'mongoose';

export type FilmType = 'movie' | 'series';
export type FilmStatus = 'watched' | 'pending';

export interface IFilm extends Document {
    title: string;
    year: number;
    genre: string;
    type: FilmType;
    status: FilmStatus;
    rating: number;
    review?: string;
    user: Schema.Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const filmSchema = new Schema<IFilm>(
    {
        title:   { type: String, required: true, trim: true },
        year:    { type: Number, required: true },
        genre:   { type: String, required: true },
        type:    { type: String, enum: ['movie', 'series'], required: true },
        status:  { type: String, enum: ['watched', 'pending'], default: 'pending' },
        rating:  { type: Number, min: 1, max: 5, default: null },
        review:  { type: String, default: null },
        user:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
        isActive:{ type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Film = model<IFilm>('Film', filmSchema);