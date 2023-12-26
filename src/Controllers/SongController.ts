import { Controller, Get } from '@nestjs/common';
import { SongEntity } from 'src/Entity/SongEntity';
import { SongService } from 'src/Services/SongService';

@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService) { }


    @Get('/getSonger')
    findAll(): Promise<SongEntity[]> {
        return this.songService.findAll();
    }
}
