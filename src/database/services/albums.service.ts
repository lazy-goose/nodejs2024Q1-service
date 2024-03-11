import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { generateUUID } from 'src/utils/uuid';
import DatabaseService from '../types/DatabaseService';
import { Album, ID } from '../types/models';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';
import { FavoritesDatabaseService } from './favorites.service';
import { TracksDatabaseService } from './tracks.service';

@Injectable()
export class AlbumsDatabaseService implements DatabaseService {
  private albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => TracksDatabaseService))
    private readonly tracksService: TracksDatabaseService,
    @Inject(forwardRef(() => FavoritesDatabaseService))
    private readonly favoritesService: FavoritesDatabaseService,
  ) {}

  getAll() {
    return this.albums;
  }

  getOneById(id: ID) {
    const album = this.albums.find((a) => a.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: generateUUID(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: ID, updateAlbumDto: UpdateAlbumDto) {
    const currentAlbum = this.getOneById(id);
    const updatedAlbum = Object.assign(currentAlbum, updateAlbumDto);
    return updatedAlbum;
  }

  delete(id: ID) {
    const currentAlbum = this.getOneById(id);
    this.albums = this.albums.filter((a) => a.id !== id);
    this.tracksService.unboundAlbum(id);
    this.favoritesService.unboundAlbum(id);
    return currentAlbum;
  }

  unboundArtist(artistId: ID) {
    this.albums.forEach((a) => {
      if (a.artistId === artistId) {
        a.artistId = null;
      }
    });
  }
}
