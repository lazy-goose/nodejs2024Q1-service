import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto } from 'src/database/services/dto/albums/create-album.dto';
import { UpdateAlbumDto } from 'src/database/services/dto/albums/update-album.dto';
import { ID } from 'src/database/types/models';

@Injectable()
export class AlbumsService {
  constructor(private readonly database: DatabaseService) {}

  getAll() {
    return this.database.albumsService.getAll();
  }

  getOneById(id: ID) {
    return this.database.albumsService.getOneById(id);
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.database.albumsService.create(createAlbumDto);
  }

  update(id: ID, updateAlbumDto: UpdateAlbumDto) {
    return this.database.albumsService.update(id, updateAlbumDto);
  }

  delete(id: ID) {
    return this.database.albumsService.delete(id);
  }
}
