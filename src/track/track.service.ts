import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { v4 as uuidv4, validate } from 'uuid';
import { Track } from './interface/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private database: Database) {}

  findAllTracks(): Track[] {
    return this.database.tracks;
  }

  findOneTrack(id: string): Track {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    const track = this.database.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track not found.', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  createTrack(trackDto: CreateTrackDto): Track {
    if (!trackDto?.name || !trackDto?.duration) {
      throw new HttpException('Invalid track data.', HttpStatus.BAD_REQUEST);
    }

    const newTrack: Track = {
      id: uuidv4(),
      name: trackDto.name,
      artistId: trackDto.artistId || null,
      albumId: trackDto.albumId || null,
      duration: trackDto.duration,
    };

    this.database.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, artistDto: UpdateTrackDto): Track {
    if (
      !validate(id) ||
      typeof artistDto?.name !== 'string' ||
      typeof artistDto?.duration !== 'number'
    ) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }

    const track = this.database.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException('Track not found.', HttpStatus.NOT_FOUND);
    }

    track.name = artistDto?.name ?? track.name;
    track.artistId = artistDto?.artistId ?? track.artistId;
    track.albumId = artistDto?.albumId ?? track.albumId;
    track.duration = artistDto?.duration ?? track.duration;

    return track;
  }

  removeTrack(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    const removedTrack = this.findOneTrack(id);
    this.database.tracks = this.database.tracks.filter(
      (track) => track.id !== removedTrack.id,
    );
  }
}
