import { geniusSearch } from '@/api/geniusLyrics';
import { useQuery } from '@tanstack/react-query';
export interface CurrentlyPlayingTrackLyrics {
  term: string;
  artist: string;
}

export const useCurrentPlayingTrackLyrics = ({
  term,
  artist,
}: CurrentlyPlayingTrackLyrics) => {
  const authRes = useQuery({
    queryKey: useCurrentPlayingTrackLyrics.queryKey({ term, artist }),
    queryFn: () =>
      geniusSearch(
        `${artist.replaceAll(' ', '-')}-${term.replaceAll(' ', '-')}`,
      ),
    retry(failureCount) {
      if (failureCount < 3) return true;
      else return false;
    },
  });

  return authRes;
};

useCurrentPlayingTrackLyrics.queryKey = ({
  term,
  artist,
}: CurrentlyPlayingTrackLyrics) => ['genius', 'lyrics', term, artist];
