import { GENIUS_CLIENT_ACCESS_TOKEN } from '@/constants';
import { API } from '@/constants/url';
import { CurrentTrackSearchParam } from '@/hooks/query/useCurrentPlayingTrackLyrics';
import { LyricsResponse } from '@/models/Lyrics';
import { isValidLyrics } from '@/utils/lyrics';

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
    .filter(searchResult =>
      isValidLyrics({ searchResult: searchResult?.result, artist, term }),
    )
    .map(validLyrics => validLyrics?.result?.url);
  if (resUrlSortedArray == null) {
    return null;
  }

  const urls = resUrlSortedArray.sort((a, b) => a.length - b.length);
  return urls ? urls[0] : null;
}
