import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import DatabaseService from '../types/DatabaseService';
import { ID } from '../types/Types';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsDatabaseService implements DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const foundArray = await this.prisma.artist.findMany();
    return foundArray.map((f) => new ArtistEntity(f));
  }

  async findOne(id: ID) {
    const found = await this.prisma.artist.findUniqueOrThrow({ where: { id } });
    return new ArtistEntity(found);
  }

  async create(createArtistDto: Prisma.ArtistCreateInput) {
    const created = await this.prisma.artist.create({ data: createArtistDto });
    return new ArtistEntity(created);
  }

  async update(id: ID, updateArtistDto: Prisma.ArtistUpdateInput) {
    const updated = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
    return new ArtistEntity(updated);
  }

  async delete(id: ID) {
    const deleted = await this.prisma.artist.delete({ where: { id } });
    return new ArtistEntity(deleted);
  }
}
