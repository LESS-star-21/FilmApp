import { Film, IFilm } from './films.model';

export class FilmsRepository {

    async create(data: Partial<IFilm>): Promise<IFilm> {
        return Film.create(data);
    }

    async findAll(userId: string): Promise<IFilm[]> {
        return Film.find({ user: userId, isActive: true } as any)
            .sort({ createdAt: -1 });
    }

    async findById(id: string): Promise<IFilm | null> {
        return Film.findById(id);
    }

    async update(id: string, userId: string, data: Partial<IFilm>): Promise<IFilm | null> {
        return Film.findOneAndUpdate(
            { _id: id, user: userId } as any,
            { $set: { ...data } },
            { new: true }
        ) as any;
    }

    async delete(id: string, userId: string): Promise<void> {
        await Film.findOneAndUpdate(
            { _id: id, user: userId } as any,
            { $set: { isActive: false } }
        );
    }
}