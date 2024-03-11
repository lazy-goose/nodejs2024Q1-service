import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { generateUUID } from 'src/utils/uuid';
import DatabaseService from '../types/DatabaseService';
import { ID, Track } from '../types/models';
import { CreateTrackDto } from '../../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { FavoritesDatabaseService } from './favorites.service';

@Injectable()
export class TracksDatabaseService implements DatabaseService {
  private tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesDatabaseService))
    private readonly favoritesService: FavoritesDatabaseService,
  ) {}

  getAll() {
    return this.tracks;
  }

  getOneById(id: ID) {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: generateUUID(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: ID, updateTrackDto: UpdateTrackDto) {
    const currentTrack = this.getOneById(id);
    const updatedTrack = Object.assign(currentTrack, updateTrackDto);
    return updatedTrack;
  }

  delete(id: ID) {
    const currentTrack = this.getOneById(id);
    this.tracks = this.tracks.filter((t) => t.id !== id);
    this.favoritesService.unboundTrack(id);
    return currentTrack;
  }

  unboundAlbum(albumId: ID) {
    this.tracks.forEach((t) => {
      if (t.albumId === albumId) {
        t.albumId = null;
      }
    });
  }

  unboundArtist(artistId: ID) {
    this.tracks.forEach((t) => {
      if (t.artistId === artistId) {
        t.artistId = null;
      }
    });
  }
}
