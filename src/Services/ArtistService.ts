// src/Services/ArtistService.ts
import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { ArtistEntity } from 'src/Entity/ArtistEntity';

@Injectable()
export class ArtistService {
    private readonly artist: Repository<ArtistEntity>;

    constructor(private connection: Connection) {
        this.artist = this.connection.getRepository(ArtistEntity);
    }

    async save(artist: ArtistEntity): Promise<ArtistEntity> {
        return this.artist.save(artist);
    }

    async find(artistName: string): Promise<ArtistEntity | undefined> {
        return this.artist.findOne({ where: { artist_name: artistName } });
    }
}
