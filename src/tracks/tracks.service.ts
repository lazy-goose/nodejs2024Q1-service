import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { ID } from 'src/database/types/models';

@Injectable()
export class TracksService {
  constructor(private readonly database: DatabaseService) {}

  findAll() {
    return this.database.tracksService.findAll();
  }

  findOne(id: ID) {
    return this.database.tracksService.findOne(id);
  }

  create(createTrackDto: CreateTrackDto) {
    return this.database.tracksService.create(createTrackDto);
  }

  update(id: ID, updateTrackDto: UpdateTrackDto) {
    return this.database.tracksService.update(id, updateTrackDto);
  }

  delete(id: ID) {
    return this.database.tracksService.delete(id);
  }
}
