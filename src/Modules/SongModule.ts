import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { SongSchedule } from "src/Schedules/SongSchedule";
import { ClientService } from "src/Services/ClientService";
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from "src/Entity/SongEntity";

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([SongEntity])],
    providers: [ClientService, SongSchedule],
})
export class SongModule { }