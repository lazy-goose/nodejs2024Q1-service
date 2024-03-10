import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDto } from 'src/database/services/dto/artists/create-artist.dto';
import { UpdateArtistDto } from 'src/database/services/dto/artists/update-artist.dto';
import { UUIDParam } from 'src/utils/uuid';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getOneById(@UUIDParam('id') id: string) {
    return this.artistsService.getOneById(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @UUIDParam('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@UUIDParam('id') id: string) {
    return this.artistsService.delete(id);
  }
}
