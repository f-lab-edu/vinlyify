import { getTopTrackLyrics } from '@/api/lyrics';
// import { getTrackLyrics } from '@/api/lyrics_php';

import { useQuery } from '@tanstack/react-query';

export interface CurrentlyPlayingTrackLyrics {
  term: string;
  artist: string;
}

export const useCurrentPlayingTrackLyrics = ({
  term,
  artist,
}: CurrentlyPlayingTrackLyrics) => {
  const res = useQuery({
    queryKey: useCurrentPlayingTrackLyrics.queryKey({ term, artist }),
    queryFn: () =>
      getTopTrackLyrics({ term, artist }).then(v => {
        if (v && 'lyrics' in v) {
          return v['lyrics'];
        } else return null;
      }),
  });

  return res;
};

useCurrentPlayingTrackLyrics.queryKey = ({
  term,
  artist,
}: CurrentlyPlayingTrackLyrics) => [
  'current-playing',
  'track',
  'lyrics',
  term,
  artist,
];
