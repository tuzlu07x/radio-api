import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/Services/ClientService';
import { SongEntity } from 'src/Entity/SongEntity';
import * as moment from 'moment';
import { SongValidation } from 'src/Validation/SongValidation';
import { ArtistEntity } from 'src/Entity/ArtistEntity';
import { ArtistService } from 'src/Services/ArtistService';
import { ArtistValidation } from 'src/Validation/ArtistValidation';

@Injectable()
export class SongSchedule {
  private readonly logger = new Logger(SongSchedule.name);

  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
    private readonly clientService: ClientService,
    private readonly artistService: ArtistService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const response = await this.clientService
      .get('https://www.kralmuzik.com.tr/rds/mobile?radio_id=112')
      .toPromise();

    const artistName = response.data.CurrentSong.ArtistName;
    const songName = response.data.CurrentSong.SongName;

    let artist: ArtistEntity | any = await this.artistService.find(songName);

    if (!artist) {
      artist = new ArtistValidation();
      (artist.artist_name = songName), this.saveEntityDate(artist);
      await this.artistService.save(artist);
    }
    const isSongExists = await this.songRepository.findOne({
      where: { song_name: artistName },
    });
    if (songName === 'REKLAM') this.logger.debug('Radio is on break');
    if (!isSongExists) {
      const songEntity = new SongValidation();
      songEntity.artist = artist;
      songEntity.song_name = artistName;
      songEntity.song_image = response.data.ServiceItuneResponse.songImage;
      songEntity.song_ituneUrl =
        response.data.ServiceItuneResponse.song_ituneUrl;
      songEntity.genre =
        response.data.ServiceItuneResponse.genre ?? 'it is null';
      songEntity.created_at = new Date(moment().valueOf());
      songEntity.updated_at = new Date(moment().valueOf());
      this.saveEntityDate(songEntity);
      await this.songRepository.save(songEntity);

      this.logger.debug('SongEntity saved:', songEntity);
    } else {
      this.logger.debug(
        `Song with name '${songName}' already exists. Skipping addition.`,
      );
    }
  }

  saveEntityDate(entity: any): void {
    entity.created_at = new Date(moment().valueOf());
    entity.updated_at = new Date(moment().valueOf());
  }
}
