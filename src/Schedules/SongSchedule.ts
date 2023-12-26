import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/Services/ClientService';
import { SongEntity } from 'src/Entity/SongEntity';
import * as moment from 'moment';

@Injectable()
export class SongSchedule {
    private readonly logger = new Logger(SongSchedule.name);

    constructor(
        @InjectRepository(SongEntity)
        private readonly songRepository: Repository<SongEntity>,
        private readonly clientService: ClientService
    ) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        const response = await this.clientService.get('https://www.kralmuzik.com.tr/rds/mobile?radio_id=112').toPromise();

        const artistName = response.data.CurrentSong.ArtistName;
        const songName = response.data.CurrentSong.SongName;

        const isSongExists = await this.songRepository.findOne({ where: { song_name: songName } });
        if (songName === 'REKLAM') this.logger.debug('Radio is on break')
        if (!isSongExists) {
            const songEntity = new SongEntity();
            songEntity.artist_name = artistName;
            songEntity.song_name = songName;
            songEntity.song_image = response.data.ServiceItuneResponse.songImage;
            songEntity.song_ituneUrl = response.data.ServiceItuneResponse.song_ituneUrl;
            songEntity.genre = response.data.ServiceItuneResponse.genre;
            songEntity.created_at = new Date(moment().valueOf());
            songEntity.updated_at = new Date(moment().valueOf());

            await songEntity.validate(songEntity);

            await this.songRepository.save(songEntity);

            this.logger.debug('SongEntity saved:', songEntity);
        } else {
            this.logger.debug(`Song with name '${songName}' already exists. Skipping addition.`);
        }
    }
}
