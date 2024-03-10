import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { AlbumsDatabaseService } from './services/albums.service';
import { ArtistsDatabaseService } from './services/artists.service';
import { FavoritesDatabaseService } from './services/favorites.service';
import { TracksDatabaseService } from './services/tracks.service';
import { UsersDatabaseService } from './services/users.service';

@Module({
  providers: [
    DatabaseService,
    UsersDatabaseService,
    AlbumsDatabaseService,
    ArtistsDatabaseService,
    TracksDatabaseService,
    FavoritesDatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
