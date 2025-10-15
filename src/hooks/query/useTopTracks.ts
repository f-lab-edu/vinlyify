import { getTopTracks } from '@/services/spotify/spotify';
import { useQuery } from '@tanstack/react-query';

export const useTopTracks = (limit?: number) => {
  const res = useQuery({
    queryKey: useTopTracks.queryKey,
    queryFn: () => getTopTracks(limit),
    // throwOnError: error => {
    //   return (
    //     error?.message == ERROR_MESSAGES[401] ||
    //     error?.message == ERROR_MESSAGES[403]
    //   );
    // },
  });

  return res;
};

useTopTracks.queryKey = ['topTracks'];
