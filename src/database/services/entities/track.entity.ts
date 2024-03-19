import { Track } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class TrackEntity {
  id: string;
  name: string;
  duration: number;
  albumId: string;
  artistId: string;

  @Exclude()
  favorite: boolean;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
