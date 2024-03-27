import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UUIDParam } from 'src/common/utils/uuid';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@UUIDParam('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Post()
  async create(@Body() createAlbumDto: Prisma.AlbumCreateInput) {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @UUIDParam('id') id: string,
    @Body() updateAlbumDto: Prisma.AlbumUpdateInput,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@UUIDParam('id') id: string) {
    return this.albumsService.delete(id);
  }
}
