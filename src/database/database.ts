import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/interface/album.interface';
import { Artist } from 'src/artist/interface/artist.interface';
import { Track } from 'src/track/interface/track.interface';
import { User } from 'src/user/interface/user.interface';

@Injectable()
export class Database {
  public users: User[] = [];
  public artists: Artist[] = [];
  public tracks: Track[] = [];
  public albums: Album[] = [];
}
