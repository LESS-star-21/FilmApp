import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role: 'admin' | 'user';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name:     { type: String, required: true, trim: true },
        email:    { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        avatar:   { type: String, default: null },
        role:     { type: String, enum: ['admin', 'user'], default: 'user' },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const User = model<IUser>('User', userSchema);