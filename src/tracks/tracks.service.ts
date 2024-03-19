import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { ID } from 'src/database/types/Types';

@Injectable()
export class TracksService {
  constructor(private readonly database: DatabaseService) {}

  async findAll() {
    return this.database.tracksService.findAll();
  }

  async findOne(id: ID) {
    return this.database.tracksService.findOne(id);
  }

  async create(createTrackDto: Prisma.TrackCreateInput) {
    return this.database.tracksService.create(createTrackDto);
  }

  async update(id: ID, updateTrackDto: Prisma.TrackUpdateInput) {
    return this.database.tracksService.update(id, updateTrackDto);
  }

  async delete(id: ID) {
    return this.database.tracksService.delete(id);
  }
}
