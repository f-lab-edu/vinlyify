import { MetaInfo, Pagination } from '.';
import { Album } from './album';
import { Artist, UserProfile } from './profile';

export interface PlaylistItem extends MetaInfo {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  owner: UserProfile;
  primary_color: null | string;
  public: null | string;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
}

interface TrackAlbumItem extends MetaInfo {
  album_type: string;
  artists: MetaInfo[];
  is_playable: boolean;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
}

export interface TrackItem extends MetaInfo {
  album: TrackAlbumItem;
  artists: MetaInfo[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  is_local: boolean;
  is_playable: boolean;
  popularity: number;
  preview_url: string;
  track_number: number;
}

export interface AlbumSearchResult extends Pagination {
  items: Album[];
}

export interface ArtistSearchResult extends Pagination {
  items: Artist[];
}
export interface TrackSearchResult extends Pagination {
  items: TrackItem[];
}

export interface PlaylistSearchResult extends Pagination {
  items: PlaylistItem[];
}

export type SearchResult = {
  albums: AlbumSearchResult;
  artists: ArtistSearchResult;
  tracks: TrackSearchResult;
  playlists: PlaylistSearchResult;
};
