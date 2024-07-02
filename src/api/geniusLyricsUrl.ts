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
  searchQ,
  artist,
  term,
}: CurrentTrackSearchParam) {
  const res: LyricsResponse = await api
    .get(`search`, {
      searchParams: { q: searchQ, access_token: GENIUS_CLIENT_ACCESS_TOKEN },
    })
    .json();
  console.log(artist, term, res?.response?.hits);
  const resUrlSortedArray = res.response?.hits
    .filter(
      v =>
        v?.result?.lyrics_state === 'complete' &&
        v?.result?.path.match(/-lyrics$/) &&
        v?.result?.primary_artist_names
          .toLowerCase()
          .match(artist.toLowerCase()),
    )
    .map(v => v?.result?.url);
  if (resUrlSortedArray == null) {
    return null;
  }

  const urls = resUrlSortedArray.sort((a, b) => a.length - b.length);
  return urls ? urls[0] : null;
}
