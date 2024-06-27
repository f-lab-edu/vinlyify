import { Album } from '@/models/Album';
import { MetaInfo } from '@/models/MetaInfo';
import { Pagination } from '@/models/Pagination';
import { Artist } from '@/models/Profile';

export interface Track extends MetaInfo {
  album: Album;
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
  is_playable?: boolean;
}

export interface Tracks extends Pagination {
  items: Album[];
}

export interface CurrentlyPlayingTrack {
  actions: {
    disallows: {
      resuming: boolean;
      toggling_repeat_context: boolean;
      toggling_repeat_track: boolean;
      toggling_shuffle: boolean;
    };
  };
  context: MetaInfo;
  currently_playing_type?: string;
  is_playing: boolean;
  item: Track;
  progress_ms: number;
  timestamp: number;
}

export interface Seed {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
}

export interface RecommendedTracks {
  tracks: Track[];
  seeds: Seed[];
}
