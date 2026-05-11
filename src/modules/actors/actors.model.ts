import { Schema, model, Document } from 'mongoose';

export interface IActor extends Document {
    name: string;
    nationality?: string;
    birthDate?: Date;
    biography?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const actorSchema = new Schema<IActor>(
    {
        name:        { type: String, required: true, trim: true },
        nationality: { type: String, default: null },
        birthDate:   { type: Date, default: null },
        biography:   { type: String, default: null },
        isActive:    { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Actor = model<IActor>('Actor', actorSchema);