import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { UUIDParam } from 'src/utils/uuid';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getOneById(@UUIDParam('id') id: string) {
    return this.tracksService.getOneById(id);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  update(@UUIDParam('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@UUIDParam('id') id: string) {
    return this.tracksService.delete(id);
  }
}
