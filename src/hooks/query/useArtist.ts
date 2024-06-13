import { getArtists } from '@/api/spotify';
import { Artist } from '@/models/Profile';
import { useQuery } from '@tanstack/react-query';

export const useArtist = ({ artists }: { artists: Artist[] }) => {
  const artistIds = artists.map(v => v.id);

  return useQuery({
    queryKey: useArtist.queryKey(artistIds),
    queryFn: () => getArtists(artistIds),
    staleTime: 0,
  });
};

useArtist.queryKey = (artistId: Artist['id'][]) => [
  'current',
  'playing',
  'artistTopTracks',
  ...artistId,
];
