import { Album } from 'src/album/interface/album.interface';
import { Artist } from 'src/artist/interface/artist.interface';
import { Track } from 'src/track/interface/track.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
