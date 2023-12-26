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

@Module({
  controllers: [AppController, SongController],
  providers: [ClientService, AppService, SongService],
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
      entities: [SongEntity],
      synchronize: true,
      logging: true,
    }),
    SongModule,
  ],
})

export class AppModule { }
