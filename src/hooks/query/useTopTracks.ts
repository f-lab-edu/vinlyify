import { getTopTracks } from '@/api/spotify';
import { useQuery } from '@tanstack/react-query';

export const useTopTracks = (limit?: number) => {
  const res = useQuery({
    queryKey: useTopTracks.queryKey,
    queryFn: () => getTopTracks(limit),
  });

  return res;
};

useTopTracks.queryKey = ['topTracks'];
