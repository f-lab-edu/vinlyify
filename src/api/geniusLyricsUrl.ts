import { GENIUS_CLIENT_ACCESS_TOKEN } from '@/constants';
import { API } from '@/constants/url';
import { CurrentTrackSearchParam } from '@/hooks/query/useCurrentPlayingTrackLyrics';

import ky from 'ky';
const api = ky.extend({
  prefixUrl: API.GENIUS,
  hooks: {
    afterResponse: [
      (_, __, res) => {
        console.log(res?.status);
        if (res?.status === 401) {
          console.log('invalid token');
        } else if (res?.status === 429) {
          console.log('too many requests..');
        }
        console.log(res);
      },
    ],
  },
});

interface LyricsResponse {
  meta: { status: number };
  response?: { hits: HitResponse[] };
}

interface HitResponse {
  highlights: [];
  index: string;
  type: string;
  result: {
    url: string;
    path: string;
    lyrics_state: 'complete' | 'incomplete';
    title: string;
    primary_artist_names: string;
  };
}

export async function geniusSearchUrl({
  search_artist_term,
  artist,
  term,
}: CurrentTrackSearchParam) {
  const res: LyricsResponse = await api
    .get(`search`, {
      searchParams: {
        q: search_artist_term,
        access_token: GENIUS_CLIENT_ACCESS_TOKEN,
      },
    })
    .json();
  const resUrlSortedArray = res.response?.hits
    .filter(
      v =>
        v?.result?.lyrics_state === 'complete' &&
        RegExp(/-lyrics$/).exec(v?.result?.path) &&
        (RegExp(artist.toLowerCase()).exec(
          v?.result?.primary_artist_names.toLowerCase(),
        ) ||
          RegExp(term.toLowerCase()).exec(v?.result?.title.toLowerCase())),
    )
    .map(v => v?.result?.url);
  if (resUrlSortedArray == null) {
    return null;
  }

  const urls = resUrlSortedArray.sort((a, b) => a.length - b.length);
  return urls ? urls[0] : null;
}
