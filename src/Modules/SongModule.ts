import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from 'src/Entity/SongEntity';
import { ArtistEntity } from 'src/Entity/ArtistEntity';
import { HttpModule } from '@nestjs/axios';
import { ClientService } from 'src/Services/ClientService';
import { SongSchedule } from 'src/Schedules/SongSchedule';
import { Module } from '@nestjs/common';
import { ArtistModule } from './ArtistModule';
import { ArtistService } from 'src/Services/ArtistService';
@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([SongEntity])],
    providers: [ClientService, SongSchedule, ArtistModule, ArtistService],
})

export class SongModule { }
