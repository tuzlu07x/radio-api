import { IsNotEmpty, IsString, ValidateIf, IsUrl, IsDate } from 'class-validator';

export class ArtistValidation {
    @IsNotEmpty()
    @IsString()
    artist_name: string;

    @IsDate()
    created_at: Date

    @IsDate()
    updated_at: Date
}
