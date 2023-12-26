import { IsNotEmpty, IsString, ValidateIf, IsUrl } from 'class-validator';

export class SongValidation {
    @IsNotEmpty()
    @IsString()
    artist_name: string;

    @IsNotEmpty()
    @IsString()
    song_name: string;

    @IsNotEmpty()
    @IsUrl({}, { message: 'Invalid URL format for song_image' })
    song_image: string;

    @IsNotEmpty()
    @IsUrl({}, { message: 'Invalid URL format for song_ituneUrl' })
    song_ituneUrl: string;

    @ValidateIf((obj, value) => value !== undefined)
    @IsString()
    genre: string;
}
