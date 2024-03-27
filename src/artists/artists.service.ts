import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { ID } from 'src/database/types/Types';

@Injectable()
export class ArtistsService {
  constructor(private readonly database: DatabaseService) {}

  async findAll() {
    return this.database.artistsService.findAll();
  }

  async findOne(id: ID) {
    return this.database.artistsService.findOne(id);
  }

  async create(createArtistDto: Prisma.ArtistCreateInput) {
    return this.database.artistsService.create(createArtistDto);
  }

  async update(id: ID, updateArtistDto: Prisma.ArtistUpdateInput) {
    return this.database.artistsService.update(id, updateArtistDto);
  }

  async delete(id: ID) {
    return this.database.artistsService.delete(id);
  }
}
