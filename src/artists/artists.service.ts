import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { ID } from 'src/database/types/models';

@Injectable()
export class ArtistsService {
  constructor(private readonly database: DatabaseService) {}

  findAll() {
    return this.database.artistsService.findAll();
  }

  findOne(id: ID) {
    return this.database.artistsService.findOne(id);
  }

  create(CreateArtistDto: CreateArtistDto) {
    return this.database.artistsService.create(CreateArtistDto);
  }

  update(id: ID, updateArtistDto: UpdateArtistDto) {
    return this.database.artistsService.update(id, updateArtistDto);
  }

  delete(id: ID) {
    return this.database.artistsService.delete(id);
  }
}
