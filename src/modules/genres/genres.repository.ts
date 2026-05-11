import { Genre, IGenre } from './genres.model';

export class GenresRepository {

    async create(data: Partial<IGenre>): Promise<IGenre> {
        return Genre.create(data);
    }

    async findAll(): Promise<IGenre[]> {
        return Genre.find({ isActive: true });
    }

    async findById(id: string): Promise<IGenre | null> {
        return Genre.findById(id);
    }

    async update(id: string, data: Partial<IGenre>): Promise<IGenre | null> {
        return Genre.findByIdAndUpdate(id, { $set: data }, { new: true });
    }

    async delete(id: string): Promise<void> {
        await Genre.findByIdAndUpdate(id, { $set: { isActive: false } });
    }
}