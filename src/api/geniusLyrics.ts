import { API } from '@/constants';
import ky from 'ky';
import { geniusSearchUrl } from './geniusLyricsUrl';
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
export async function geniusSearch(searchQ: string) {
  const url = await geniusSearchUrl(searchQ);
  if (url == null) return null;
  const res: LyricsResponse = await api
    .get(`lyrics`, {
      searchParams: { q: url },
    })
    .json();
  return res;
}
