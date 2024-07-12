import { getPage } from '@/api/spotify';
import { SCOPE } from '@/components/Search/constants';
import { SearchResult } from '@/models/Spotify';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export const useInfiniteSearchList = (url: string) => {
  const [searchParam] = useSearchParams();
  // 현재 탭을 url 파람에서 찾고, 없다면 디폴트인 앨범 탭으로 설정합니다.
  const currentScope = (searchParam.get(SCOPE) ??
    'albums') as keyof SearchResult;

  const res = useInfiniteQuery({
    queryKey: useInfiniteSearchList.queryKey(url),
    initialPageParam: url,
    queryFn: ({ pageParam }) => getPage(pageParam),
    getNextPageParam: lastPage => lastPage?.[currentScope]?.next,
    getPreviousPageParam: firstPage => firstPage?.[currentScope]?.previous,
  });
  return res;
};
useInfiniteSearchList.queryKey = (keywordUrl: string) => {
  return ['search', 'infinite', keywordUrl];
};
