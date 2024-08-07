import { searchFromMyTopOne, searchKeyword } from '@/api/spotify';
import { URL_PARAMS } from '@/constants/url';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export const useSearchKeyword = () => {
  const [searchParams] = useSearchParams();

  // 검색어를 입력하지 않은 경우 내 top1 아티스트 기준으로
  const defaultSearch = useQuery({
    queryKey: useSearchKeyword.queryKey(),
    queryFn: () => searchFromMyTopOne().then(v => v.response),
    staleTime: Infinity,
  });

  const keywordParam = searchParams.get(URL_PARAMS.KEYWORD);

  const res = useQuery({
    queryKey: useSearchKeyword.queryKey(keywordParam),
    queryFn: () => searchKeyword(keywordParam),
    notifyOnChangeProps: ['data'],
    staleTime: 2_000,
    placeholderData: keepPreviousData,
  });
  if (!searchParams.has(URL_PARAMS.KEYWORD)) return defaultSearch;

  return res;
};
useSearchKeyword.queryKey = (keyword?: string | null) => {
  const default_querykeys = ['search', 'list'];
  if (keyword == null || keyword === '') return default_querykeys;
  return [...default_querykeys, keyword];
};
