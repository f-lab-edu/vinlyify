interface UserProfile {
  country?: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Album {
  album_type: string;
  artists: Artist[];
  external_urls: External_Urls;
  images: AlbumImage[];
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
  available_markets?: string[];
  href?: string;
  id?: string;
}

interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

interface External_Urls {
  spotify: string;
  href: string;
  id: string;
}

interface Artist {
  external_urls: External_Urls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Tracks {
  href: string;
  items: Album[];
  limit: number;
  next: string;
  offset: number;
  previous: null | unknown;
  total: number;
}

interface Track {
  album: Album[];
  artists: Artist[];
  available_markets: Pick<Artist, 'available_markets'>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: Pick<External_Urls, 'spotify'>;
  href: string;
  id: string;
  is_local?: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface Seed {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
}

interface Recommendations {
  tracks: Track[];
  seeds: Seed[];
}

interface CurrentlyPlaying {
  actions: {
    disallows: {
      resuming: boolean;
      toggling_repeat_context: boolean;
      toggling_repeat_track: boolean;
      toggling_shuffle: boolean;
    };
  };
  context: {
    external_urls: Pick<External_Urls, 'spotify'>;
    href: string;
    type: string;
    uri: string;
  };
  currently_playing_type?: string;
  is_playing: boolean;
  item: Track;
  progress_ms: number;
  timestamp: number;
}
