// https://www.stands4.com/services/v2/lyrics.php?uid=1001&tokenid=tk324324&term=forever%20young&artist=Alphaville&format=xml

import { API, API_KEY } from '@/constants';
import ky from 'ky';

export interface TopTrackLyricsResponse {
  message: {
    body?: {
      lyrics_id: number;
      explicit: number;
      lyrics_body: string;
      script_tracking_url: string;
      pixel_tracking_url: string;
      lyrics_copyright: string;
      updated_time: Date;
    };
  };
  header: { execute_time: bigint; status_code: number };
}

const api = ky.extend({
  prefixUrl: API.MUSIX_MATCH,
});

export async function getTopTrackLyrics({
  term,
  artist,
}: {
  term: string;
  artist: string;
}) {
  if (artist && term) {
    const result = api
      .get(
        `matcher.lyrics.get?apikey=${API_KEY}&q_track=${encodeURIComponent(term)}&q_artist=${encodeURIComponent(artist)}`,
      )
      .then(v => v.json<TopTrackLyricsResponse>())
      .then(v => v?.message?.body);
    return result ?? null;
  }
  return null;
}
