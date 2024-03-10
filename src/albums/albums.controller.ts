import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAlbumDto } from 'src/database/services/dto/albums/create-album.dto';
import { UpdateAlbumDto } from 'src/database/services/dto/albums/update-album.dto';
import { UUIDParam } from 'src/utils/uuid';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getOneById(@UUIDParam('id') id: string) {
    return this.albumsService.getOneById(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(@UUIDParam('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@UUIDParam('id') id: string) {
    return this.albumsService.delete(id);
  }
}
