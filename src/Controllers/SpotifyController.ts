// src/Controllers/SongController.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SpotifyService } from 'src/Services/SpotifyService';
import { Type } from 'src/Enums/SpotifyEnum';

@Controller('spotify')
export class SpotifyController {
    constructor(private readonly spotifyService: SpotifyService) { }

    @Post('/token')
    async token() {
        return this.spotifyService.token();

    }

    @Post('/me')
    async me() {
        return this.spotifyService.me();
    }

    @Get('/search')
    async search(@Body('searchTerm') searchTerm: string, @Body('type') type: Type[]) {
        return this.spotifyService.search(
            process.env.SPOTIFY_BEARER_TOKEN,
            searchTerm,
            type.toString(),
        );
    }
}
