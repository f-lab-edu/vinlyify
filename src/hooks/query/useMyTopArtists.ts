import { getMyTopItems } from '@/services/spotify/spotify';
import { useQuery } from '@tanstack/react-query';

export const useMyTopArtists = () => {
  const res = useQuery({
    queryKey: useMyTopArtists.queryKey,
    queryFn: () => getMyTopItems({}),
    // throwOnError: error => {
    //   return (
    //     error?.message == ERROR_MESSAGES[401] ||
    //     error?.message == ERROR_MESSAGES[403]
    //   );
    // },
    // retry(failureCount, error) {
    //   if (
    //     error?.message == ERROR_MESSAGES[401] ||
    //     error?.message == ERROR_MESSAGES[403]
    //   ) {
    //     return false;
    //   }
    //   if (failureCount < 3) return true;
    //   else return false;
    // },
  });

  return res;
};

useMyTopArtists.queryKey = ['topArtists'];
