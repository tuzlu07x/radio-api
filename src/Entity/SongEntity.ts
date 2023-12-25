import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
