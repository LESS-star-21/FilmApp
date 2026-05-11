import { GenresRepository } from './genres.repository';
import { CreateGenreDto, UpdateGenreDto } from './genres.schema';
import { IGenre } from './genres.model';

export class GenresService {
    private repository = new GenresRepository();

    async create(data: CreateGenreDto): Promise<IGenre> {
        return this.repository.create(data);
    }

    async findAll(): Promise<IGenre[]> {
        return this.repository.findAll();
    }

    async findById(id: string): Promise<IGenre> {
        const genre = await this.repository.findById(id);
        if (!genre) throw new Error('El género no existe');
        return genre;
    }

    async update(id: string, data: UpdateGenreDto): Promise<IGenre> {
        const genre = await this.repository.update(id, data);
        if (!genre) throw new Error('El género no existe');
        return genre;
    }

    async delete(id: string): Promise<void> {
        const genre = await this.repository.findById(id);
        if (!genre) throw new Error('El género no existe');
        await this.repository.delete(id);
    }
}