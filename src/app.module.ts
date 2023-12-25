import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongController } from './Controllers/SongController';
import { SongModule } from './Modules/SongModule';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { SongEntity } from './Entity/SongEntity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'radio',
      entities: [SongEntity],
      synchronize: true,
    }),
    SongModule,
  ],
})

export class AppModule { }
