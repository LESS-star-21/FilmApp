import { DirectorsRepository } from './directors.repository';
import { CreateDirectorDto, UpdateDirectorDto } from './directors.schema';
import { IDirector } from './directors.model';

export class DirectorsService {
    private repository = new DirectorsRepository();

    async create(data: CreateDirectorDto): Promise<IDirector> {
        const parsed = {
            ...data,
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        };
        return this.repository.create(parsed);
    }

    async findAll(): Promise<IDirector[]> {
        return this.repository.findAll();
    }

    async findById(id: string): Promise<IDirector> {
        const director = await this.repository.findById(id);
        if (!director) throw new Error('El director no existe');
        return director;
    }

    async update(id: string, data: UpdateDirectorDto): Promise<IDirector> {
        const parsed = {
            ...data,
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        };
        const director = await this.repository.update(id, parsed);
        if (!director) throw new Error('El director no existe');
        return director;
    }

    async delete(id: string): Promise<void> {
        const director = await this.repository.findById(id);
        if (!director) throw new Error('El director no existe');
        await this.repository.delete(id);
    }
}