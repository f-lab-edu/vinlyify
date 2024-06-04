import { getTopTracks } from '@/api/spotify';
import { useQuery } from '@tanstack/react-query';

export const useTopTracks = () => {
  const res = useQuery({
    queryKey: useTopTracks.queryKey,
    queryFn: () => getTopTracks(),
  });

  return res;
};

useTopTracks.queryKey = ['topTracks'];
