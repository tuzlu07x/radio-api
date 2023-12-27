import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { SpotifyService } from "src/Services/SpotifyService";

@Module({
    imports: [HttpModule],
    providers: [SpotifyService],
})
export class SpotifyModule { }
