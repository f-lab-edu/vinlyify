import { API } from '@/constants';
import ky from 'ky';
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
  console.log(searchQ.replaceAll("'", '').replaceAll(' ', '-') + '-lyrics');
  const res: LyricsResponse = await api
    .get(`lyrics`, {
      searchParams: { q: searchQ.replaceAll(' ', '-') },
    })
    .json();
  console.log(res);
  return res;
}
