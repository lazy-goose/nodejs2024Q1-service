import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { ID } from 'src/database/types/Types';

@Injectable()
export class AlbumsService {
  constructor(private readonly database: DatabaseService) {}

  async findAll() {
    return this.database.albumsService.findAll();
  }

  async findOne(id: ID) {
    return this.database.albumsService.findOne(id);
  }

  async create(createAlbumDto: Prisma.AlbumCreateInput) {
    return this.database.albumsService.create(createAlbumDto);
  }

  async update(id: ID, updateAlbumDto: Prisma.AlbumUpdateInput) {
    return this.database.albumsService.update(id, updateAlbumDto);
  }

  async delete(id: ID) {
    return this.database.albumsService.delete(id);
  }
}
