import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from 'src/Entity/SongEntity';
import { ArtistEntity } from 'src/Entity/ArtistEntity';
import { HttpModule } from '@nestjs/axios';
import { ClientService } from 'src/Services/ClientService';
import { SongSchedule } from 'src/Schedules/SongSchedule';
import { Module } from '@nestjs/common';
@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([ArtistEntity])],
    providers: [],
})

export class ArtistModule { }
