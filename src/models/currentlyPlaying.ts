import { External_Urls } from '@/models';
import { Track } from './track';

export interface CurrentlyPlaying {
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
