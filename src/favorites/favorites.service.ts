import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ID } from 'src/database/types/Types';

@Injectable()
export class FavoritesService {
  constructor(private readonly database: DatabaseService) {}

  async findAll() {
    return this.database.favoritesService.findAll();
  }

  async addAlbum(id: ID) {
    return this.database.favoritesService.addAlbum(id);
  }

  async deleteAlbum(id: ID) {
    return this.database.favoritesService.deleteAlbum(id);
  }

  async addArtist(id: ID) {
    return this.database.favoritesService.addArtist(id);
  }

  async deleteArtist(id: ID) {
    return this.database.favoritesService.deleteArtist(id);
  }

  async addTrack(id: ID) {
    return this.database.favoritesService.addTrack(id);
  }

  async deleteTrack(id: ID) {
    return this.database.favoritesService.deleteTrack(id);
  }
}
