import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ID } from 'src/database/types/models';

@Injectable()
export class FavoritesService {
  constructor(private readonly database: DatabaseService) {}

  getAll() {
    return this.database.favoritesService.getAll();
  }

  addAlbum(id: ID) {
    return this.database.favoritesService.addAlbum(id);
  }

  deleteAlbum(id: ID) {
    return this.database.favoritesService.deleteAlbum(id);
  }

  addArtist(id: ID) {
    return this.database.favoritesService.addArtist(id);
  }

  deleteArtist(id: ID) {
    return this.database.favoritesService.deleteArtist(id);
  }

  addTrack(id: ID) {
    return this.database.favoritesService.addTrack(id);
  }

  deleteTrack(id: ID) {
    return this.database.favoritesService.deleteTrack(id);
  }
}
