import { Schema, model, Document, Types } from 'mongoose';

export interface IList extends Document {
    name: string;
    description?: string;
    films: Types.ObjectId[];
    user: Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const listSchema = new Schema<IList>(
    {
        name:        { type: String, required: true, trim: true },
        description: { type: String, default: null },
        films:       [{ type: Schema.Types.ObjectId, ref: 'Film' }],
        user:        { type: Schema.Types.ObjectId, ref: 'User', required: true },
        isActive:    { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const List = model<IList>('List', listSchema);