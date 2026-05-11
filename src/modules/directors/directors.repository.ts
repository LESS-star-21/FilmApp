import { Director, IDirector } from './directors.model';

export class DirectorsRepository {

    async create(data: Partial<IDirector>): Promise<IDirector> {
        return Director.create(data);
    }

    async findAll(): Promise<IDirector[]> {
        return Director.find({ isActive: true });
    }

    async findById(id: string): Promise<IDirector | null> {
        return Director.findById(id);
    }

    async update(id: string, data: Partial<IDirector>): Promise<IDirector | null> {
        return Director.findByIdAndUpdate(id, { $set: data }, { new: true });
    }

    async delete(id: string): Promise<void> {
        await Director.findByIdAndUpdate(id, { $set: { isActive: false } });
    }
}