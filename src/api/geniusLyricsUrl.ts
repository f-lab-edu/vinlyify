// import {
//   GENIUS_CLIENT_ACCESS_TOKEN,
//   SPOTIFY_WEB_API,
//   VINYLIFY_TOKEN,
// } from '@/constants';
// import { API } from '@/constants/url';
// import { CurrentTrackSearchParam } from '@/hooks/query/useCurrentPlayingTrackLyrics';
// import { LyricsResponse } from '@/models/Lyrics';

// import ky from 'ky';
// const api = ky.extend({
//   prefixUrl: API.GENIUS,
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

// export async function geniusSearchUrl({
//   search_artist_term,
//   artist,
//   term,
// }: CurrentTrackSearchParam) {
//   const res: LyricsResponse = await api
//     .get(`search`, {
//       searchParams: {
//         q: search_artist_term,
//         access_token: GENIUS_CLIENT_ACCESS_TOKEN,
//       },
//     })
//     .json();

//   return res;
// }

// export async function searchGeniusSong({ url }: { url: string }) {
//   const res: LyricsResponse = await api
//     .get(`${url}`, {
//       searchParams: {
//         access_token: GENIUS_CLIENT_ACCESS_TOKEN,
//       },
//     })
//     .json();

//   return res;
// }

// export async function geniusSearchUrlNewApi({
//   apiUrl,
//   // text_format = 'plain',
// }: {
//   apiUrl: string;
//   // text_format: 'plain' | 'dom' | 'html';
// }) {
//   const res: LyricsResponse = await api
//     .get(apiUrl, { searchParams: { access_token: GENIUS_CLIENT_ACCESS_TOKEN } })
//     .json();

//   // const res: LyricsResponse = await api
//   // .get(apiUrl, { searchParams: { access_token: GENIUS_CLIENT_ACCESS_TOKEN } })
//   // .then(async data => {
//   //   // const options = {
//   //   //   apiKey: GENIUS_CLIENT_ACCESS_TOKEN,
//   //   //   title: res.response?.hits[0].result.title,
//   //   //   artist: res.response?.hits[0].result.primary_artist_names,
//   //   //   optimizeQuery: true,
//   //   // };

//   //   const lyrics = await getLyrics(res.response?.hits[0].result.path);
//   //   // .then(lyrics => lyrics)
//   //   // .json();
//   //   return lyrics;
//   // });

//   return res;
// }
