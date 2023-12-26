// song.validation.ts
import { IsEmpty, IsNotEmpty, IsString, IsUrl } from 'class-validator';

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

    @IsEmpty()
    @IsString()
    genre: string;
}
