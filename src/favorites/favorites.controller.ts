import {
  ArgumentsHost,
  Catch,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaExceptionFilter } from 'src/common/exceptions/prisma-exception.filter';
import { UUIDParam } from 'src/common/utils/uuid';
import { FavoritesService } from './favorites.service';

@Catch(Prisma.PrismaClientKnownRequestError)
class UnprocessableEntityFilter extends PrismaExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception.code === 'P2025') {
      const status = HttpStatus.UNPROCESSABLE_ENTITY;
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
      return;
    }

    super.catch(exception, host);
  }
}

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return this.favoritesService.findAll();
  }

  @Post('album/:id')
  @UseFilters(UnprocessableEntityFilter)
  async addAlbum(@UUIDParam('id') id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  @UseFilters(UnprocessableEntityFilter)
  async addArtist(@UUIDParam('id') id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteArtist(id);
  }

  @Post('track/:id')
  @UseFilters(UnprocessableEntityFilter)
  async addTrack(@UUIDParam('id') id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteTrack(id);
  }
}
