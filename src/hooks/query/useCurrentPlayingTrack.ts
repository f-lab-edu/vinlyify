import { getPlayingTrack } from '@/services/spotify/spotify';
import { useQuery } from '@tanstack/react-query';

// 현재 재생 중인 플레이리스트 3초 간격으로 refetch 해오기
export const useCurrentPlayingTrack = ({
  enabled = false,
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: useCurrentPlayingTrack.queryKey(),
    queryFn: () => getPlayingTrack(),
    refetchInterval: 3_000,
    staleTime: 0,
    // throwOnError: error => {
    //   return (
    //     error?.message == ERROR_MESSAGES[401] ||
    //     error?.message == ERROR_MESSAGES[403]
    //   );
    // },
    enabled,
    // retry(failureCount, error) {
    //   if (
    //     error?.message == ERROR_MESSAGES[401].message ||
    //     error?.message == ERROR_MESSAGES[403].message
    //   ) {
    //     return false;
    //   }
    //   if (failureCount < 3) {
    //     return true;
    //   } else return false;
    // },
  });
};

useCurrentPlayingTrack.queryKey = () => ['current', 'playing', 'track'];
