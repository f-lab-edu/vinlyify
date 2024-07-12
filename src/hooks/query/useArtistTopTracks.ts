import { getArtistTopTracks } from '@/api/spotify';
import { Artist } from '@/models/Profile';
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
  });
};

useArtistTopTracks.queryKey = (artistId: Artist['id']) => [
  'current',
  'playing',
  'artistTopTracks',
  artistId,
];
