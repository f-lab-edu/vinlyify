import {
  getPlayingTrack,
  getRecommendations,
  getTopTracks,
  searchFromMyTopOne,
  searchKeyword,
} from '@/api/spotify';
import { QueryClient, useQuery } from '@tanstack/react-query';

export const useTopTracks = () => {
  const res = useQuery({
    queryKey: useTopTracks.queryKey,
    queryFn: () => getTopTracks(),
  });

  return res;
};

useTopTracks.queryKey = ['topTracks'];

export const useRecommendations = () => {
  return useQuery({
    queryKey: useRecommendations.queryKey,
    queryFn: () => getRecommendations(),
  });
};

useRecommendations.queryKey = ['reccomendations'];

// 현재 재생 중인 플레이리스트 3초 간격으로 refetch 해오기
export const useCurrentPlayingTrack = () => {
  return useQuery({
    queryKey: useCurrentPlayingTrack.queryKey,
    queryFn: () => getPlayingTrack(),
    refetchInterval: 3000,
    staleTime: 0,
  });
};

useCurrentPlayingTrack.queryKey = ['current', 'playing', 'track'];

export const useInfiniteSearchList = () => {};

export const usePrefetchSearchList = (keyword: string) => {
  const queryClient = new QueryClient();
  return queryClient.prefetchQuery({
    queryKey: usePrefetchSearchList.queryKey,
    queryFn: () => searchKeyword(keyword),
  });
};

usePrefetchSearchList.queryKey = ['prefetch', 'search'];

export const useSearchKeyword = (keyword: string | null) => {
  // 검색어를 입력하지 않은 경우 내 top1 아티스트 기준으로
  const { data } = useQuery({
    queryKey: useSearchKeyword.queryKey,
    queryFn: () => searchFromMyTopOne().then(v => v.response),
  });

  const res = useQuery({
    queryKey: useSearchKeyword.queryKey,
    queryFn: () => searchKeyword(keyword),
    enabled: false,
    initialData: { ...data },
  });
  return res;
};
useSearchKeyword.queryKey = ['search', 'list'];
