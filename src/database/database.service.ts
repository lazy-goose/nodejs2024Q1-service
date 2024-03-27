import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsDatabaseService } from './services/albums.service';
import { ArtistsDatabaseService } from './services/artists.service';
import { FavoritesDatabaseService } from './services/favorites.service';
import { TracksDatabaseService } from './services/tracks.service';
import { UsersDatabaseService } from './services/users.service';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(forwardRef(() => UsersDatabaseService))
    public readonly usersService: UsersDatabaseService,
    @Inject(forwardRef(() => AlbumsDatabaseService))
    public readonly albumsService: AlbumsDatabaseService,
    @Inject(forwardRef(() => ArtistsDatabaseService))
    public readonly artistsService: ArtistsDatabaseService,
    @Inject(forwardRef(() => TracksDatabaseService))
    public readonly tracksService: TracksDatabaseService,
    @Inject(forwardRef(() => FavoritesDatabaseService))
    public readonly favoritesService: FavoritesDatabaseService,
  ) {}
}
