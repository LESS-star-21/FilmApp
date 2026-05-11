import { Schema, model, Document } from 'mongoose';

export interface IGenre extends Document {
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const genreSchema = new Schema<IGenre>(
    {
        name:        { type: String, required: true, unique: true, trim: true },
        description: { type: String, default: null },
        isActive:    { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Genre = model<IGenre>('Genre', genreSchema);