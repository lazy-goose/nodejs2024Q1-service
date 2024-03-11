import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { generateUUID } from 'src/utils/uuid';
import DatabaseService from '../types/DatabaseService';
import { Artist, ID } from '../types/models';
import { AlbumsDatabaseService } from './albums.service';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../../artists/dto/update-artist.dto';
import { FavoritesDatabaseService } from './favorites.service';
import { TracksDatabaseService } from './tracks.service';

@Injectable()
export class ArtistsDatabaseService implements DatabaseService {
  private artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumsDatabaseService))
    private readonly albumsService: AlbumsDatabaseService,
    @Inject(forwardRef(() => TracksDatabaseService))
    private readonly tracksService: TracksDatabaseService,
    @Inject(forwardRef(() => FavoritesDatabaseService))
    private readonly favoritesService: FavoritesDatabaseService,
  ) {}

  getAll() {
    return this.artists;
  }

  getOneById(id: ID) {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: generateUUID(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: ID, updateArtistDto: UpdateArtistDto) {
    const currentArtist = this.getOneById(id);
    const updatedArtist = Object.assign(currentArtist, updateArtistDto);
    return updatedArtist;
  }

  delete(id: ID) {
    const currentArtist = this.getOneById(id);
    this.artists = this.artists.filter((a) => a.id !== id);
    this.albumsService.unboundArtist(id);
    this.tracksService.unboundArtist(id);
    this.favoritesService.unboundArtist(id);
    return currentArtist;
  }
}
