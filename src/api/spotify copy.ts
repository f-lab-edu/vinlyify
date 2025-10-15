// import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
// import {
//   DEFAULT_PLAY_TRACK,
//   SPOTIFY_WEB_API,
//   VINYLIFY_TOKEN,
// } from '@/constants';
// import { API } from '@/constants/url';

// import { SearchResult, TrackSearchResult } from '@/models/Spotify';
// import { Track } from '@/models/Track';
// import splitLengthyList from '@/utils/splitLengthyList';

// import ky from 'ky';

// const api = ky.extend({
//   prefixUrl: API.SPOTIFY,
//   hooks: {
//     beforeError: [
//       error => {
//         const { response } = error;
//         if (response && response.body) {
//           switch (response.status) {
//             case 429:
//             case 500:
//               error.name = ERROR_MESSAGES[response.status].name;
//               error.message = ERROR_MESSAGES[response.status].message; // toast만 띄우기
//               return error;
//             case 401:
//             case 403:
//               SPOTIFY_WEB_API.setAccessToken(null);
//               localStorage.removeItem(VINYLIFY_TOKEN);
//               error.name = ERROR_MESSAGES[response.status].name;
//               error.message = ERROR_MESSAGES[response.status].message; // 에러
//               return error;
//             default:
//               error.name = ERROR_MESSAGES.GENERIC_ERROR.name;
//               error.message = ERROR_MESSAGES.GENERIC_ERROR.message;
//               return error;
//           }

//           // error.name = ERROR_MESSAGES.GENERIC_ERROR.name;
//           // if (response.status === 429) {
//           //   error.message = `Too Many Requests [${response?.statusText}]`;
//           // } else if (response.status === 401) {
//           //   error.name = 'SPOTIFY_ERROR_INVALID_TOKEN';
//           // SPOTIFY_WEB_API.setAccessToken(null);
//           // localStorage.removeItem(VINYLIFY_TOKEN);
//           //   error.message = 'Unauthorized — token invalid or expired';
//           // } else if (response.status === 403) {
//           //   error.message = `Bad OAuth request [${response?.statusText}]`;
//           // } else {
//           //   error.message = `${response.statusText} (${response.status})`;
//           // }
//         }
//         return error;
//       },
//     ],
//     beforeRequest: [
//       req =>
//         req.headers.set(
//           'Authorization',
//           `Bearer ${localStorage.getItem(VINYLIFY_TOKEN)}`,
//         ),
//     ],

//     // !! localStorage에서 토큰이 사라졌을 떄?
//     // afterResponse: [
//     //   async (input, options, response) => {
//     //     if (response.status === 403) {
//     //       const token = SPOTIFY_WEB_API.getAccessToken();

//     //       // Retry with the token
//     //       options.headers.set('Authorization', `token ${token}`);

//     //       return ky(input, options);
//     //     }
//     //   },
//     // ],
//   },
// });

// SPOTIFY_WEB_API.setAccessToken(localStorage.getItem(VINYLIFY_TOKEN));

// // SPOTIFY_WEB_API.getMyDevices()
// export function getMyDevices(): Promise<SpotifyApi.UserDevicesResponse> {
//   return api.get(`me/player/devices`).json();
// }

// /**
//  *  활성화된 기기 ID 찾기
//  */
// export async function getActiveDevice(): Promise<string | null> {
//   return await getMyDevices().then(
//     res =>
//       res.devices.filter(device => {
//         return device.is_active;
//       })[0]?.id,
//   );
// }

// /**
//  * top5 청취기록
//  */
// export function getTopTracks(limit = 5): Promise<TrackSearchResult> {
//   return api.get(`me/top/tracks?time_range=short_term&limit=${limit}`).json();
// }

// /**
//  * 트랙 재생하기
//  */
// export async function playTrack({
//   context_uris = DEFAULT_PLAY_TRACK,
//   active_device,
//   offset = { position: 0 },
//   position_ms = 0,
// }: {
//   context_uris: string;
//   offset?: { uri?: string; position?: number };
//   active_device?: string;
//   position_ms?: number;
// }) {
//   const id = await getActiveDevice();
//   return await api
//     .put(`me/player/play?device_id=${active_device ?? id}`, {
//       json: {
//         context_uri: context_uris,
//         offset,
//         position_ms,
//       },
//     })
//     .json();
// }

// /**
//  * 트랙 중지하기
//  */
// export async function pauseTrack({
//   active_device,
// }: {
//   active_device?: string | null;
// }) {
//   return api
//     .put(`me/player/pause`, {
//       json: {
//         device_id: active_device ?? (await getActiveDevice()),
//       },
//     })
//     .json();
// }

// /**
//  * 현제 제셍 노래 정보 : SPOTIFY_WEB_API.getMyCurrentPlayingTrack()
//  */
// export function getPlayingTrack(): Promise<SpotifyApi.CurrentlyPlayingResponse> {
//   return api.get('me/player/currently-playing').json();
// }

// /**
//  * 게시물 페이지 가져오기
//  */
// export function getPage(endpoint: string): Promise<SearchResult> {
//   return api.get(`${endpoint.replace(API.SPOTIFY, '')}`).json();
// }

// /* 다수 아티스트 검색 */
// export async function getArtistList(artists: string[]) {
//   if (artists.length > 50) {
//     const results = await Promise.all(
//       splitLengthyList(artists).map(list =>
//         api.get(`artists?ids=${list.join(',')}`),
//       ),
//     );
//     return results;
//   } else {
//     const res: SpotifyApi.MultipleArtistsResponse = await api
//       .get(`artists?ids=${artists.join(',')}`)
//       .json();
//     return res.artists;
//   }
// }

// export function searchKeyword(
//   searchWord: string | null,
// ): Promise<SpotifyApi.SearchResponse> {
//   if (!searchWord) {
//     throw new Error(`no searchword provided`);
//   }

//   return api
//     .get(`search?q=${searchWord}&type=album,artist,playlist,track`)
//     .json();
// }

// /**
//  * top1 아티스트 기반 디폴트 검색
//  */
// export async function searchFromMyTopOne(): Promise<{
//   keyword?: string;
//   response: SpotifyApi.SearchResponse;
// }> {
//   const topArtistName = (await getTopTracks(1)).items[0]?.artists[0]?.name;
//   const response = await searchKeyword(`${topArtistName}`);
//   return { keyword: topArtistName, response };
// }

// /**
//  * artist top tracks : 재생 중인 트랙의 아티스트의 top 10 tracks
//  */
// export function getArtistTopTracks({ id }: { id: string }) {
//   return api.get(`artists/${id}/top-tracks`, {}).json<{ tracks: Track[] }>();
// }

// /**
//  * artist top tracks : 재생 중인 트랙의 아티스트의 top 10 tracks
//  * SPOTIFY_WEB_API.getMyTopArtists();
//  */
// export function getMyTopItems({
//   type = 'artists',
//   time_range = 'medium_term',
//   limit = 20,
//   offset = 0,
// }: {
//   type?: 'artists' | 'tracks';
//   limit?: number;
//   offset?: number;
//   time_range?: 'long_term' | 'medium_term' | 'short_term'; //long_term (calculated from ~1 year of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks)
// }): Promise<
//   SpotifyApi.UsersTopArtistsResponse | SpotifyApi.UsersTopTracksResponse
// > {
//   return api
//     .get(
//       `me/top/${type}?time_range=${time_range}&limit=${limit <= 20 ? limit : 20}&offset=${offset}`,
//     )
//     .json();
// }
