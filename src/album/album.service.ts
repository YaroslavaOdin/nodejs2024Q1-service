import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { v4 as uuidv4, validate } from 'uuid';
import { Album } from './interface/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private database: Database) {}

  findAllAlbums(): Album[] {
    return this.database.albums;
  }

  findOneAlbum(id: string): Album {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    const album = this.database.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  createAlbum(albumDto: CreateAlbumDto): Album {
    if (!albumDto?.name || !albumDto?.year) {
      throw new HttpException('Invalid album data.', HttpStatus.BAD_REQUEST);
    }

    const newAlbum: Album = {
      id: uuidv4(),
      name: albumDto.name,
      year: albumDto.year,
      artistId: albumDto.artistId || null,
    };

    this.database.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, albumDto: UpdateAlbumDto): Album {
    if (
      !validate(id) ||
      typeof albumDto?.name !== 'string' ||
      typeof albumDto?.year !== 'number'
    ) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }

    const album = this.database.albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);
    }

    album.name = albumDto?.name ?? album.name;
    album.year = albumDto?.year ?? album.year;
    album.artistId = albumDto?.artistId ?? album.artistId;

    return album;
  }

  removeAlbum(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    const removedAlbum = this.findOneAlbum(id);
    this.database.albums = this.database.albums.filter(
      (album) => album.id !== removedAlbum.id,
    );

    this.database.tracks.forEach((track) => {
      if (track.albumId === removedAlbum.id) {
        track.albumId = null;
      }
    });
  }
}
