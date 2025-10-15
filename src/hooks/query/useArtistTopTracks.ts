import { Artist } from '@/models/Profile';
import { getArtistTopTracks } from '@/services/spotify/spotify';
import { useQuery } from '@tanstack/react-query';

export const useArtistTopTracks = ({
  artistId,
}: {
  artistId: Artist['id'];
}) => {
  return useQuery({
    queryKey: useArtistTopTracks.queryKey(artistId),
    queryFn: () => getArtistTopTracks({ id: artistId }),
    staleTime: 0,
    // throwOnError: error => {
    //   return (
    //     error?.message == ERROR_MESSAGES[401] ||
    //     error?.message == ERROR_MESSAGES[403]
    //   );
    // },
    // retry(failureCount, error) {
    //   if (
    //     error?.message == ERROR_MESSAGES[401] ||
    //     error?.message == ERROR_MESSAGES[403] ||
    //     error?.message == ERROR_MESSAGES[429]
    //   ) {
    //     return false;
    //   }
    //   if (failureCount < 3) return true;
    //   else return false;
    // },
  });
};

useArtistTopTracks.queryKey = (artistId: Artist['id']) => [
  'current',
  'playing',
  'artistTopTracks',
  artistId,
];
