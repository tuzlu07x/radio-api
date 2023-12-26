// src/Services/SongService.ts
import { Injectable } from '@nestjs/common';
import { Repository, Connection, SelectQueryBuilder } from 'typeorm';
import { SongEntity } from 'src/Entity/SongEntity';
import { PaginationDto } from 'src/DTO/PaginationDto';

@Injectable()
export class SongService {
    private readonly song: Repository<SongEntity>;

    constructor(private connection: Connection) {
        this.song = this.connection.getRepository(SongEntity);
    }

    async findAll(paginationDto: PaginationDto): Promise<{ items: SongEntity[]; totalItems: number; currentPage: number; pageSize: number }> {
        const { page = 1, pageSize = 10 } = paginationDto;

        const query: SelectQueryBuilder<SongEntity> = this.song.createQueryBuilder('song');

        const [items, totalItems] = await query
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount();

        return {
            items: items,
            totalItems,
            currentPage: page,
            pageSize,
        };
    }
}
