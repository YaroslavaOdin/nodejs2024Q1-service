import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { FavoritesResponse } from './interface/favorites.interface';
import { validate } from 'uuid';
import { Artist } from 'src/artist/interface/artist.interface';
import { Album } from 'src/album/interface/album.interface';
import { Track } from 'src/track/interface/track.interface';

@Injectable()
export class FavoritesService {
  constructor(private database: Database) {}

  findAllFavorites(): FavoritesResponse {
    const artistsId: string[] = this.database.favorites.artists;
    const artists: Artist[] = this.database.artists.filter((artist) =>
      artistsId.includes(artist.id),
    );
    const albumsId: string[] = this.database.favorites.albums;
    const albums: Album[] = this.database.albums.filter((album) =>
      albumsId.includes(album.id),
    );
    const tracksId: string[] = this.database.favorites.tracks;
    const tracks: Track[] = this.database.tracks.filter((track) =>
      tracksId.includes(track.id),
    );
    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrack(id: string): string {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    if (!this.database.tracks.find((track) => track.id === id)) {
      throw new HttpException(
        'Track not found.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.database.favorites.tracks.push(id);
    return id;
  }

  addAlbum(id: string): string {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    if (!this.database.albums.find((album) => album.id === id)) {
      throw new HttpException(
        'Album not found.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.database.favorites.albums.push(id);
    return id;
  }

  addArtist(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    if (!this.database.artists.find((artisn) => artisn.id === id)) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.database.favorites.artists.push(id);
  }

  deleteTrack(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    const removedTrack = this.database.favorites.tracks.find(
      (track) => track === id,
    );
    if (!removedTrack) {
      throw new HttpException('Track not found.', HttpStatus.NOT_FOUND);
    }
    this.database.favorites.tracks = this.database.favorites.tracks.filter(
      (track) => track !== removedTrack,
    );
  }

  deleteAlbum(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    const removedAlbum = this.database.favorites.albums.find(
      (album) => album === id,
    );
    if (!removedAlbum) {
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);
    }
    this.database.favorites.albums = this.database.favorites.albums.filter(
      (album) => album !== removedAlbum,
    );
  }

  deleteArtist(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    const removedArtist = this.database.favorites.artists.find(
      (artist) => artist === id,
    );
    if (!removedArtist) {
      throw new HttpException('Artist not found.', HttpStatus.NOT_FOUND);
    }
    this.database.favorites.artists = this.database.favorites.artists.filter(
      (artist) => artist !== removedArtist,
    );
  }
}
