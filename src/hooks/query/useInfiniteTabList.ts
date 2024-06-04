import { searchFromMyTopOne, searchKeyword } from '@/api/spotify';
import { DEFAULT_TAB, SCOPE, TAB } from '@/components/Search/constants';
import { URL_PARAMS } from '@/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useSearchKeyword } from './useSearchKeyword';

export const useInfiniteTabList = () => {
  const [searchParam] = useSearchParams();
  return useInfiniteQuery({
    queryKey: useInfiniteTabList.queryKey({
      keyword: searchParam.get(URL_PARAMS.KEYWORD),
      scope: searchParam.get(SCOPE),
    }),
    queryFn: async () => {
      if (!searchParam.has(URL_PARAMS.KEYWORD)) {
        const currentTabData = searchFromMyTopOne()
          .then(v => v.response)
          .then(v => v[searchParam.get(SCOPE) ?? DEFAULT_TAB]);
        return currentTabData;
      } else {
        const currentTabKeywordData = searchKeyword(
          searchParam.get(URL_PARAMS.KEYWORD),
        ).then(v => v[searchParam.get(SCOPE) ?? DEFAULT_TAB]);
        return currentTabKeywordData;
      }
    },
    initialPageParam: null,
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage?.next);
      console.log(pages[0]);
      return lastPage?.next;
    },
    maxPages: 5,
  });
};

useInfiniteTabList.queryKey = ({
  keyword,
  scope,
}: {
  keyword?: string | null;
  scope?: string | null;
}) => {
  const valid_scope = Object.values(TAB).includes(scope as string)
    ? scope
    : DEFAULT_TAB;
  const defaultQueryKey = useSearchKeyword.queryKey();
  if (!keyword) return [...defaultQueryKey, valid_scope];
  else return [...defaultQueryKey, keyword, valid_scope];
};
