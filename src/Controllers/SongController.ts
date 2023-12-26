// src/Controllers/SongController.ts
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { SongService } from 'src/Services/SongService';
import { PaginationDto } from 'src/DTO/PaginationDto';

@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService) { }

    @Get('/getSongs')
    async findAll(@Query() paginationDto: PaginationDto, @Res() res: Response): Promise<void> {
        const result = await this.songService.findAll(paginationDto);
        res.set('X-Total-Items', result.totalItems.toString());
        res.set('X-Current-Page', result.currentPage.toString());
        res.set('X-Page-Size', result.pageSize.toString());
        res.json(result.items);
    }
}
