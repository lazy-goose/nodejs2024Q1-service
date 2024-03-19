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
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@UUIDParam('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @Post()
  async create(@Body() createTrackDto: Prisma.TrackCreateInput) {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  async update(
    @UUIDParam('id') id: string,
    @Body() updateTrackDto: Prisma.TrackUpdateInput,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@UUIDParam('id') id: string) {
    return this.tracksService.delete(id);
  }
}
