import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from 'src/database/services/dto/tracks/create-track.dto';
import { UpdateTrackDto } from 'src/database/services/dto/tracks/update-track.dto';
import { ID } from 'src/database/types/models';

@Injectable()
export class TracksService {
  constructor(private readonly database: DatabaseService) {}

  getAll() {
    return this.database.tracksService.getAll();
  }

  getOneById(id: ID) {
    return this.database.tracksService.getOneById(id);
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
