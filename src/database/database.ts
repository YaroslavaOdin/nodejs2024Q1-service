import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artist/interface/artist.interface';
import { User } from 'src/user/interface/user.interface';

@Injectable()
export class Database {
  public users: User[] = [];
  public artists: Artist[] = [];
}
