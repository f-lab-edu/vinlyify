import { getPage } from '@/api/spotify';
import { SearchResult } from '@/models/Spotify';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export const useInfiniteSearchList = (url: string) => {
  const [searchParam] = useSearchParams();
  const currentScope = (searchParam.get('scope') ??
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
useInfiniteSearchList.queryKey = (keywordUrl: string | null) => {
  return ['search', 'infinite', 'list', keywordUrl];
};
