import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongController } from './Controllers/SongController';
import { SongModule } from './Modules/SongModule';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { SongEntity } from './Entity/SongEntity';
import { ClientService } from './Services/ClientService';
import { SongService } from './Services/SongService';
import { SpotifyModule } from './Modules/SpotifyModule';
import { SpotifyController } from './Controllers/SpotifyController';
import { SpotifyService } from './Services/SpotifyService';
import { ConfigModule } from '@nestjs/config';
import { ArtistEntity } from './Entity/ArtistEntity';
import { ArtistModule } from './Modules/ArtistModule';

@Module({
  controllers: [AppController, SongController, SpotifyController],
  providers: [ClientService, AppService, SongService, SpotifyService],
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Fatih1234',
      database: 'radio',
      entities: [SongEntity, ArtistEntity],
      synchronize: true,
      //logging: true,
    }),
    ConfigModule.forRoot(),
    SongModule,
    SpotifyModule,
    ArtistModule
  ],
})

export class AppModule { }
