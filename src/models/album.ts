import { MetaInfo } from '@/models';
import { Artist } from './profile';

export interface Album extends MetaInfo {
  album_type: string;
  artists: Artist[];
  is_playable: boolean;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  available_markets?: string[];
}
