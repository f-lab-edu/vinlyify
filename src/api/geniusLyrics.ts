import { API } from '@/constants/url';
import ky from 'ky';
import { CurrentTrackSearchParam, geniusSearchUrl } from './geniusLyricsUrl';
const api = ky.extend({
  prefixUrl: API.EXPRESS,
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
  params: string;
  result?: string;
}
export async function geniusSearch({
  searchQ,
  artist,
  term,
}: CurrentTrackSearchParam) {
  const url = await geniusSearchUrl({ searchQ, artist, term });
  if (url == null) return null;
  const res: LyricsResponse = await api
    .get(`lyrics`, {
      searchParams: { q: url },
    })
    .json();
  return res;
}
