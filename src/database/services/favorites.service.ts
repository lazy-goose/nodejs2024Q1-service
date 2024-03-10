import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import DatabaseService from '../types/DatabaseService';
import { Favorites, ID } from '../types/models';
import { AlbumsDatabaseService } from './albums.service';
import { ArtistsDatabaseService } from './artists.service';
import { TracksDatabaseService } from './tracks.service';

@Injectable()
export class FavoritesDatabaseService implements DatabaseService {
  private favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => AlbumsDatabaseService))
    private readonly albumsService: AlbumsDatabaseService,
    @Inject(forwardRef(() => ArtistsDatabaseService))
    private readonly artistsService: ArtistsDatabaseService,
    @Inject(forwardRef(() => TracksDatabaseService))
    private readonly tracksService: TracksDatabaseService,
  ) {}

  private getEntity<T>(id: ID, resolver: (id: ID) => T) {
    try {
      return resolver(id);
    } catch {
      return null;
    }
  }

  private mapResolve<T>(ids: ID[], resolver: (id: ID) => T) {
    return ids
      .map((id) => this.getEntity(id, resolver))
      .filter((v) => v !== null);
  }

  getAll() {
    return {
      albums: this.mapResolve(this.favorites.albums, (id) =>
        this.albumsService.getOneById(id),
      ),
      artists: this.mapResolve(this.favorites.artists, (id) =>
        this.artistsService.getOneById(id),
      ),
      tracks: this.mapResolve(this.favorites.tracks, (id) =>
        this.tracksService.getOneById(id),
      ),
    };
  }

  addAlbum(albumId: ID) {
    const album = this.getEntity(albumId, (id) =>
      this.albumsService.getOneById(id),
    );
    if (!album) {
      throw new UnprocessableEntityException(`Album '${albumId}' not found`);
    }
    if (!this.favorites.albums.includes(albumId)) {
      this.favorites.albums.push(albumId);
    }
    return albumId;
  }

  deleteAlbum(albumId: ID) {
    if (!this.favorites.albums.includes(albumId)) {
      throw new NotFoundException(`Album '${albumId}' not found in favorites`);
    }
    const targetIndex = this.favorites.albums.indexOf(albumId);
    this.favorites.albums.splice(targetIndex, 1);
    return albumId;
  }

  addArtist(artistId: ID) {
    const artist = this.getEntity(artistId, (id) =>
      this.artistsService.getOneById(id),
    );
    if (!artist) {
      throw new UnprocessableEntityException(`Artist '${artistId}' not found`);
    }
    if (!this.favorites.artists.includes(artistId)) {
      this.favorites.artists.push(artistId);
    }
    return artistId;
  }

  deleteArtist(artistId: ID) {
    if (!this.favorites.artists.includes(artistId)) {
      throw new NotFoundException(
        `Artist '${artistId}' not found in favorites`,
      );
    }
    const targetIndex = this.favorites.artists.indexOf(artistId);
    this.favorites.artists.splice(targetIndex, 1);
    return artistId;
  }

  addTrack(trackId: ID) {
    const track = this.getEntity(trackId, (id) =>
      this.tracksService.getOneById(id),
    );
    if (!track) {
      throw new UnprocessableEntityException(`Track '${trackId}' not found`);
    }
    if (!this.favorites.tracks.includes(trackId)) {
      this.favorites.tracks.push(trackId);
    }
    return trackId;
  }

  deleteTrack(trackId: ID) {
    if (!this.favorites.tracks.includes(trackId)) {
      throw new NotFoundException(`Track '${trackId}' not found in favorites`);
    }
    const targetIndex = this.favorites.tracks.indexOf(trackId);
    this.favorites.tracks.splice(targetIndex, 1);
    return trackId;
  }

  unboundAlbum(albumId: ID) {
    this.favorites.albums = this.favorites.albums.filter(
      (aId) => aId !== albumId,
    );
  }

  unboundArtist(artistId: ID) {
    this.favorites.artists = this.favorites.artists.filter(
      (aId) => aId !== artistId,
    );
  }

  unboundTrack(trackId: ID) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (tId) => tId !== trackId,
    );
  }
}
