import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import DatabaseService from '../types/DatabaseService';
import { ID } from '../types/Types';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksDatabaseService implements DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const foundArray = await this.prisma.track.findMany();
    return foundArray.map((f) => new TrackEntity(f));
  }

  async findOne(id: ID) {
    const found = await this.prisma.track.findUniqueOrThrow({ where: { id } });
    return new TrackEntity(found);
  }

  async create(createTrackDto: Prisma.TrackCreateInput) {
    const created = await this.prisma.track.create({ data: createTrackDto });
    return new TrackEntity(created);
  }

  async update(id: ID, updateTrackDto: Prisma.TrackUpdateInput) {
    const updated = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
    return new TrackEntity(updated);
  }

  async delete(id: ID) {
    const deleted = await this.prisma.track.delete({ where: { id } });
    return new TrackEntity(deleted);
  }
}
