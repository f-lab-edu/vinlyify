import { Album } from '@/models/Album';
import { MetaInfo } from '@/models/MetaInfo';
import { Pagination } from '@/models/Pagination';
import { Artist, UserProfile } from '@/models/Profile';
import { Track } from './Track';

export interface PlaylistItem extends MetaInfo {
  collaborative: boolean;
  description: string;
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

export interface AlbumSearchResult extends Pagination {
  items: Album[];
}

export interface ArtistSearchResult extends Pagination {
  items: Artist[];
}
export interface TrackSearchResult extends Pagination {
  items: Track[];
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
