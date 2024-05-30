import { getPlayingTrack } from '@/api/spotify';
import { useQuery } from '@tanstack/react-query';

// 현재 재생 중인 플레이리스트 3초 간격으로 refetch 해오기
export const useCurrentPlayingTrack = () => {
  return useQuery({
    queryKey: useCurrentPlayingTrack.queryKey(),
    queryFn: () => getPlayingTrack(),
    refetchInterval: 3_000,
    staleTime: 0,
  });
};

useCurrentPlayingTrack.queryKey = () => ['current', 'playing', 'track'];
