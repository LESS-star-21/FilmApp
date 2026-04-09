import { FilmsRepository } from './films.repository';
import { CreateFilmDto, UpdateFilmDto } from './films.schema';
import { IFilm } from './films.model';

export class FilmsService {
    private repository = new FilmsRepository();

    async create(data: CreateFilmDto, userId: string): Promise<IFilm> {
        return this.repository.create({ ...data, user: userId as any });
    }

    async findAll(userId: string): Promise<IFilm[]> {
        return this.repository.findAll(userId);
    }

    async findById(id: string): Promise<IFilm> {
        const film = await this.repository.findById(id);
        if (!film) throw new Error('La película no existe');
        return film;
    }

    async update(id: string, userId: string, data: UpdateFilmDto): Promise<IFilm> {
        const film = await this.repository.update(id, userId, data);
        if (!film) throw new Error('La película no existe');
        return film;
    }

    async delete(id: string, userId: string): Promise<void> {
        const film = await this.repository.findById(id);
        if (!film) throw new Error('La película no existe');
        await this.repository.delete(id, userId);
    }

    async rate(id: string, userId: string, rating: number, review?: string): Promise<IFilm> {
        const film = await this.repository.update(id, userId, {
            rating,
            review,
            status: 'watched',
        } as any);
        if (!film) throw new Error('La película no existe');
        return film;
    }
}