import { List, IList } from './lists.model';

export class ListsRepository {

    async create(data: Partial<IList>): Promise<IList> {
        return List.create(data);
    }

    async findAll(userId: string): Promise<IList[]> {
        return List.find({ user: userId, isActive: true }).populate('films');
    }

    async findById(id: string): Promise<IList | null> {
        return List.findById(id).populate('films');
    }

    async update(id: string, userId: string, data: Partial<IList>): Promise<IList | null> {
        return List.findOneAndUpdate(
            { _id: id, user: userId },
            { $set: data },
            { new: true }
        );
    }

    async addFilm(id: string, userId: string, filmId: string): Promise<IList | null> {
        return List.findOneAndUpdate(
            { _id: id, user: userId },
            { $addToSet: { films: filmId } },
            { new: true }
        );
    }

    async removeFilm(id: string, userId: string, filmId: string): Promise<IList | null> {
        return List.findOneAndUpdate(
            { _id: id, user: userId },
            { $pull: { films: filmId } },
            { new: true }
        );
    }

    async delete(id: string, userId: string): Promise<void> {
        await List.findOneAndUpdate(
            { _id: id, user: userId },
            { $set: { isActive: false } }
        );
    }
}