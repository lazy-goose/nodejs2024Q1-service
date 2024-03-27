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
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@UUIDParam('id') id: string) {
    return this.artistsService.findOne(id);
  }

  @Post()
  async create(@Body() createArtistDto: Prisma.ArtistCreateInput) {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @UUIDParam('id') id: string,
    @Body() updateArtistDto: Prisma.ArtistUpdateInput,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@UUIDParam('id') id: string) {
    return this.artistsService.delete(id);
  }
}
