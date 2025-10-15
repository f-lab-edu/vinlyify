// // import { geniusSearch } from '@/api/geniusLyrics';
// import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
// import { useQuery } from '@tanstack/react-query';
// export interface CurrentlyPlayingTrackLyrics {
//   term: string;
//   artist: string;
// }

// export interface CurrentTrackSearchParam extends CurrentlyPlayingTrackLyrics {
//   search_artist_term: string;
// }

// export const useCurrentPlayingTrackLyrics = ({
//   term,
//   artist,
// }: CurrentlyPlayingTrackLyrics) => {
//   const authRes = useQuery({
//     queryKey: useCurrentPlayingTrackLyrics.queryKey({ term, artist }),
//     queryFn: () =>
//       geniusSearch({ search_artist_term: `${artist} ${term}`, artist, term }),
//     retry(failureCount, error) {
//       if (
//         error?.message == ERROR_MESSAGES[401].message ||
//         error?.message == ERROR_MESSAGES[403].message
//       ) {
//         return false;
//       }
//       if (failureCount < 3) return true;
//       else return false;
//     },
//     throwOnError: error => {
//       return error.message != null;
//     },
//   });

//   return authRes;
// };

// useCurrentPlayingTrackLyrics.queryKey = ({
//   term,
//   artist,
// }: CurrentlyPlayingTrackLyrics) => ['genius', 'lyrics', term, artist];
