import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { ID } from 'src/database/types/models';

@Injectable()
export class ArtistsService {
  constructor(private readonly database: DatabaseService) {}

  getAll() {
    return this.database.artistsService.getAll();
  }

  getOneById(id: ID) {
    return this.database.artistsService.getOneById(id);
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
