// import { API } from '@/constants/url';
// import { CurrentTrackSearchParam } from '@/hooks/query/useCurrentPlayingTrackLyrics';
// import ky from 'ky';

// import { SPOTIFY_WEB_API, VINYLIFY_TOKEN } from '@/constants';
// import { geniusSearchUrl, geniusSearchUrlNewApi } from './geniusLyricsUrl';
// const api = ky.extend({
//   prefixUrl: API.EXPRESS,
//   hooks: {
//     afterResponse: [
//       (_, __, res) => {
//         if (res.status === 401) {
//           SPOTIFY_WEB_API.setAccessToken(null);
//           localStorage.removeItem(VINYLIFY_TOKEN);
//           throw new Error('Unauthorized — token invalid or expired');
//         } else if (res.status === 429) {
//           throw new Error('Rate limited — too many requests');
//         } else if (res.status >= 400) {
//           throw new Error(`HTTP error ${res.status}`);
//         }
//       },
//     ],
//   },
// });

// interface LyricsSearchResponse {
//   params: string;
//   result?: string;
// }

// export async function geniusSearch({
//   search_artist_term,
//   artist,
//   term,
// }: CurrentTrackSearchParam) {
//   const url = await geniusSearchUrl({ search_artist_term, artist, term });
//   if (url == null) return null;
//   const res = await geniusSearchUrlNewApi({
//     apiUrl: url.response?.hits[0]?.result.url,
//     // ?.api_path.replace('/', ''),
//   });
//   return res;
// }
