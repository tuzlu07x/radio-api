// song.entity.ts
import { SongValidation } from 'src/Validation/SongValidation';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { validateSync } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class SongEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    artist_name: string;

    @Column()
    song_name: string;

    @Column()
    song_image: string;

    @Column()
    song_ituneUrl: string;

    @Column()
    genre: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    async validate(songValidation: SongValidation): Promise<void> {
        const errors = validateSync(songValidation);
        if (errors.length > 0) {
            throw new BadRequestException({ message: 'Validation failed', errors });
        }
    }
}
