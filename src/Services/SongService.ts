import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { SongEntity } from 'src/Entity/SongEntity';

@Injectable()
export class SongService {
    private readonly song: Repository<SongEntity>;

    constructor(private connection: Connection) {
        this.song = this.connection.getRepository(SongEntity);
    }

    findAll(): Promise<SongEntity[]> {
        return this.song.find();
    }
}
