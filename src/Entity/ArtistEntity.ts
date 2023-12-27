// song.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { validateSync } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { ArtistValidation } from 'src/Validation/ArtistValidation';

@Entity()
export class ArtistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    artist_name: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    async validate(artistValidation: ArtistValidation): Promise<void> {
        const errors = validateSync(artistValidation);
        if (errors.length > 0) {
            throw new BadRequestException({ message: 'Validation failed', errors });
        }
    }
}
