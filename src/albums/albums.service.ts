import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { ID } from 'src/database/types/models';

@Injectable()
export class AlbumsService {
  constructor(private readonly database: DatabaseService) {}

  findAll() {
    return this.database.albumsService.findAll();
  }

  findOne(id: ID) {
    return this.database.albumsService.findOne(id);
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
