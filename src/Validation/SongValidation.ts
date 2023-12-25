// song.validation.ts
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class SongValidation {
    @IsNotEmpty()
    @IsString()
    artist_name: string;

    @IsNotEmpty()
    @IsString()
    song_name: string;

    @IsNotEmpty()
    @IsUrl()
    song_image: string;

    @IsNotEmpty()
    @IsUrl()
    song_ituneUrl: string;

    @IsNotEmpty()
    @IsString()
    genre: string;
}
