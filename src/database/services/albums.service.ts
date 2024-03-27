import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import DatabaseService from '../types/DatabaseService';
import { ID } from '../types/Types';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsDatabaseService implements DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const foundArray = await this.prisma.album.findMany();
    return foundArray.map((f) => new AlbumEntity(f));
  }

  async findOne(id: ID) {
    const found = await this.prisma.album.findUniqueOrThrow({ where: { id } });
    return new AlbumEntity(found);
  }

  async create(createAlbumDto: Prisma.AlbumCreateInput) {
    const created = await this.prisma.album.create({ data: createAlbumDto });
    return new AlbumEntity(created);
  }

  async update(id: ID, updateAlbumDto: Prisma.AlbumUpdateInput) {
    const updated = await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
    return new AlbumEntity(updated);
  }

  async delete(id: ID) {
    const deleted = await this.prisma.album.delete({ where: { id } });
    return new AlbumEntity(deleted);
  }
}
