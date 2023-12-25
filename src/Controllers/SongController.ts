import { Controller, Get } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { ClientService } from 'src/Services/ClientService';

@Controller()
export class SongController {
    constructor(private readonly clientService: ClientService) { }

    @Get('/getSonger')
    async get(): Promise<any> {
        const response = await this.clientService.get('https://www.kralmuzik.com.tr/rds/mobile?radio_id=112').toPromise();

        return {
            artistName: response.data.CurrentSong.SongName,
            songName: response.data.CurrentSong.ArtistName,
            songImage: response.data.ServiceItuneResponse.songImage,
            songItuneUrl: response.data.ServiceItuneResponse.song_ituneUrl,
            genre: response.data.ServiceItuneResponse.genre,
        };
    }
}
