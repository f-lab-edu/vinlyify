// // https://www.stands4.com/services/v2/lyrics.php?uid=1001&tokenid=tk324324&term=forever%20young&artist=Alphaville&format=xml
// !! ㅜㅜ 가사에 든 말로 노래 찾는 api ..
// import { TOKEN_ID, UID } from '@/constants';

// import ky from 'ky';

// const api = ky.extend({
//   // prefixUrl: API.STANDS4,
//   prefixUrl: '/music-info/stands4-api',
//   hooks: {
//     // beforeRequest: [
//     //   req =>
//     //     req.headers.set(
//     //       'Authorization',
//     //       `Bearer ${localStorage.getItem(VINYLIFY_TOKEN)}`,
//     //     ),
//     // ],
//     afterResponse: [
//       (_, __, res) => {
//         console.log(res?.status);
//         if (res?.status === 401) {
//           console.log('invalid token');
//         } else if (res?.status === 429) {
//           console.log('too many requests..');
//         }
//         console.log(res);
//       },
//     ],
//   },
// });

// export async function getTrackLyrics({
//   term,
//   artist,
// }: {
//   term: string;
//   artist: string;
// }) {
//   if (!term) {
//     return 'no track name provided';
//   }
//   if (!artist) {
//     return 'no artist name provided';
//   }
//   const result = api
//     .get(
//       `lyrics.php?uid=${UID}&tokenid=${TOKEN_ID}&term=${term}&artist=${artist}&format=json`,
//       {},
//     )
//     .json();
//   return result;
// }
