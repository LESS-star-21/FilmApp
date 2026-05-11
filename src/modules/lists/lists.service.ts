import { ListsRepository } from './lists.repository';
import { CreateListDto, UpdateListDto } from './lists.schema';
import { IList } from './lists.model';

export class ListsService {
    private repository = new ListsRepository();

    async create(data: CreateListDto, userId: string): Promise<IList> {
        return this.repository.create({ ...data, user: userId as any });
    }

    async findAll(userId: string): Promise<IList[]> {
        return this.repository.findAll(userId);
    }

    async findById(id: string): Promise<IList> {
        const list = await this.repository.findById(id);
        if (!list) throw new Error('La lista no existe');
        return list;
    }

    async update(id: string, userId: string, data: UpdateListDto): Promise<IList> {
        const list = await this.repository.update(id, userId, data);
        if (!list) throw new Error('La lista no existe');
        return list;
    }

    async addFilm(id: string, userId: string, filmId: string): Promise<IList> {
        const list = await this.repository.addFilm(id, userId, filmId);
        if (!list) throw new Error('La lista no existe');
        return list;
    }

    async removeFilm(id: string, userId: string, filmId: string): Promise<IList> {
        const list = await this.repository.removeFilm(id, userId, filmId);
        if (!list) throw new Error('La lista no existe');
        return list;
    }

    async delete(id: string, userId: string): Promise<void> {
        const list = await this.repository.findById(id);
        if (!list) throw new Error('La lista no existe');
        await this.repository.delete(id, userId);
    }
}