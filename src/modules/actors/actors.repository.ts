import { Actor, IActor } from './actors.model';

export class ActorsRepository {

    async create(data: Partial<IActor>): Promise<IActor> {
        return Actor.create(data);
    }

    async findAll(): Promise<IActor[]> {
        return Actor.find({ isActive: true });
    }

    async findById(id: string): Promise<IActor | null> {
        return Actor.findById(id);
    }

    async update(id: string, data: Partial<IActor>): Promise<IActor | null> {
        return Actor.findByIdAndUpdate(id, { $set: data }, { new: true });
    }

    async delete(id: string): Promise<void> {
        await Actor.findByIdAndUpdate(id, { $set: { isActive: false } });
    }
}