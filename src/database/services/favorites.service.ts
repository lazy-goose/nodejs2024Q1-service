import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import DatabaseService from '../types/DatabaseService';
import { ID } from '../types/Types';
import { AlbumEntity } from './entities/album.entity';
import { ArtistEntity } from './entities/artist.entity';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class FavoritesDatabaseService implements DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const [albums, artists, tracks] = await this.prisma.$transaction([
      this.prisma.album.findMany({ where: { favorite: true } }),
      this.prisma.artist.findMany({ where: { favorite: true } }),
      this.prisma.track.findMany({ where: { favorite: true } }),
    ]);
    return {
      albums: albums.map((e) => new AlbumEntity(e)),
      artists: artists.map((e) => new ArtistEntity(e)),
      tracks: tracks.map((e) => new TrackEntity(e)),
    };
  }

  async addAlbum(albumId: ID) {
    const added = await this.prisma.album.update({
      where: { id: albumId },
      data: { favorite: true },
    });
    return new AlbumEntity(added);
  }

  async deleteAlbum(albumId: ID) {
    const deleted = await this.prisma.album.update({
      where: { id: albumId },
      data: { favorite: false },
    });
    return new AlbumEntity(deleted);
  }

  async addArtist(artistId: ID) {
    const added = await this.prisma.artist.update({
      where: { id: artistId },
      data: { favorite: true },
    });
    return new ArtistEntity(added);
  }

  async deleteArtist(artistId: ID) {
    const deleted = await this.prisma.artist.update({
      where: { id: artistId },
      data: { favorite: false },
    });
    return new ArtistEntity(deleted);
  }

  async addTrack(trackId: ID) {
    const added = await this.prisma.track.update({
      where: { id: trackId },
      data: { favorite: true },
    });
    return new TrackEntity(added);
  }

  async deleteTrack(trackId: ID) {
    const deleted = await this.prisma.track.update({
      where: { id: trackId },
      data: { favorite: false },
    });
    return new TrackEntity(deleted);
  }
}
