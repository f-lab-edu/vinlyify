import { searchFromMyTopOne, searchKeyword } from '@/api/spotify';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import useCurrentKeyword from '../searchParams/useCurrentKeyword';

export const useSearchKeyword = () => {
  // 검색어를 입력하지 않은 경우 내 top1 아티스트 기준으로
  const defaultSearch = useQuery({
    queryKey: useSearchKeyword.queryKey(),
    queryFn: () => searchFromMyTopOne().then(v => v.response),
    staleTime: Infinity,
  });

  const keywordParam = useCurrentKeyword();

  const res = useQuery({
    queryKey: useSearchKeyword.queryKey(keywordParam),
    queryFn: () => searchKeyword(keywordParam),
    notifyOnChangeProps: ['data'],
    staleTime: 2_000,
    placeholderData: keepPreviousData,
  });
  if (keywordParam == null) return defaultSearch;

  return res;
};
useSearchKeyword.queryKey = (keyword?: string | null) => {
  const default_querykeys = ['search', 'list'];
  if (keyword == null || keyword === '') return default_querykeys;
  return [...default_querykeys, keyword];
};
