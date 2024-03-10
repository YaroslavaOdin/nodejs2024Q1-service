import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { Artist } from './interface/artist.interface';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private database: Database) {}

  findAllArtists(): Artist[] {
    return this.database.artists;
  }

  findOneArtist(id: string): Artist {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist not found.', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  createArtist(artistDto: CreateArtistDto) {
    if (!artistDto?.name || !artistDto?.grammy) {
      throw new HttpException('Invalid artist data.', HttpStatus.BAD_REQUEST);
    }

    const newArtist: Artist = {
      id: uuidv4(),
      name: artistDto.name,
      grammy: artistDto.grammy,
    };

    this.database.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, artistDto: UpdateArtistDto): Artist {
    if (
      !validate(id) ||
      typeof artistDto?.name !== 'string' ||
      typeof artistDto?.grammy !== 'boolean'
    ) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }

    const artist = this.database.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException('Artist not found.', HttpStatus.NOT_FOUND);
    }

    artist.name = artistDto?.name ?? artist.name;
    artist.grammy = artistDto?.grammy ?? artist.grammy;

    return artist;
  }

  removeArtist(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    const removedArtist = this.findOneArtist(id);
    this.database.artists = this.database.artists.filter(
      (artist) => artist.id !== removedArtist.id,
    );

    this.database.tracks.forEach((track) => {
      if (track.artistId === removedArtist.id) {
        track.artistId = null;
      }
    });

    this.database.albums.forEach((album) => {
      if (album.artistId === removedArtist.id) {
        album.artistId = null;
      }
    });
  }
}
