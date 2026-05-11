import { ActorsRepository } from './actors.repository';
import { CreateActorDto, UpdateActorDto } from './actors.schema';
import { IActor } from './actors.model';

export class ActorsService {
    private repository = new ActorsRepository();

    async create(data: CreateActorDto): Promise<IActor> {
        const parsed = {
            ...data,
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        };
        return this.repository.create(parsed);
    }

    async findAll(): Promise<IActor[]> {
        return this.repository.findAll();
    }

    async findById(id: string): Promise<IActor> {
        const actor = await this.repository.findById(id);
        if (!actor) throw new Error('El actor no existe');
        return actor;
    }

    async update(id: string, data: UpdateActorDto): Promise<IActor> {
        const parsed = {
            ...data,
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        };
        const actor = await this.repository.update(id, parsed);
        if (!actor) throw new Error('El actor no existe');
        return actor;
    }

    async delete(id: string): Promise<void> {
        const actor = await this.repository.findById(id);
        if (!actor) throw new Error('El actor no existe');
        await this.repository.delete(id);
    }
}