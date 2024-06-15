// import { getTopTrackLyrics } from '@/api/lyrics';

// import { useQuery } from '@tanstack/react-query';

// export interface CurrentlyPlayingTrackLyrics {
//   term: string;
//   artist: string;
// }

// export const useCurrentPlayingTrackLyrics = ({
//   term,
//   artist,
// }: CurrentlyPlayingTrackLyrics) => {
//   const res = useQuery({
//     queryKey: useCurrentPlayingTrackLyrics.queryKey({ term, artist }),
//     queryFn: () => getTopTrackLyrics({ term, artist }),
//   });

//   return res;
// };

// useCurrentPlayingTrackLyrics.queryKey = ({
//   term,
//   artist,
// }: CurrentlyPlayingTrackLyrics) => ['topTracks', term, artist];
