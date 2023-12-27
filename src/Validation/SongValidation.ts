import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateIf, IsUrl, IsDate, IsNumber, ValidateNested } from 'class-validator';
import { ArtistEntity } from 'src/Entity/ArtistEntity';

export class SongValidation {

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ArtistEntity)
    artist: ArtistEntity;

    @IsNotEmpty()
    @IsString()
    song_name: string;

    @IsNotEmpty()
    @IsUrl({}, { message: 'Invalid URL format for song_image' })
    song_image: string;

    @IsNotEmpty()
    @IsUrl({}, { message: 'Invalid URL format for song_ituneUrl' })
    song_ituneUrl: string;

    @IsDate()
    created_at: Date

    @IsDate()
    updated_at: Date

    @ValidateIf((obj, value) => value !== undefined)
    @IsString()
    genre: string;
}
