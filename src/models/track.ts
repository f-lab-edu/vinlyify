import { MetaInfo, Pagination } from '@/models';
import { Album } from './album';
import { Artist } from './profile';

export interface Track extends MetaInfo {
  album: Album[];
  artists: Artist[];
  available_markets: Pick<Album, 'available_markets'>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  is_local?: boolean;
  popularity: number;
  preview_url: string;
  track_number: number;
}

export interface Tracks extends Pagination {
  items: Album[];
}
