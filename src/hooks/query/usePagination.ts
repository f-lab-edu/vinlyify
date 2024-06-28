import { getPage } from '@/api/spotify';
import { SearchResult } from '@/models/Spotify';
import { queryClient } from '@/providers/tanstackQuery';
import { useQueries } from '@tanstack/react-query';
import useCurrentKeyword from '../searchParams/useCurrentKeyword';
import useCurrentTab from '../searchParams/useCurrentTab';
import { useSearchKeyword } from './useSearchKeyword';

export const usePagination = () => {
  const currentKeyword = useCurrentKeyword();
  const currentTab = useCurrentTab();
  let currentUrls: string[] = [];
  // 모든 탭 데이터를 가져옵니다.
  const allTabSearchData: SearchResult | undefined = queryClient.getQueryData(
    useSearchKeyword.queryKey(currentKeyword),
  );
  // 페이지 데이터의 url을 useQueries로 전달하기 위해 모든 탭 중 현재 탭의 데이터 url을 배열에 담습니다.
  if (allTabSearchData != null) {
    const { total, href, limit } = allTabSearchData[currentTab];
    currentUrls = [
      ...Array.from({ length: Math.ceil(total / limit) }, (_, i) =>
        href.replace(/&offset=[0-9]{1,}/, `&offset=${i * limit}`),
      ),
    ];
  }

  const res = useQueries({
    queries: currentUrls.map(url => ({
      queryKey: usePagination.queryKey(url),
      queryFn: () => getPage(url),
      staleTime: Infinity,
    })),
  });

  return res;
};
usePagination.queryKey = (keyword?: string | null) => {
  const default_querykeys = ['search', 'list'];
  if (keyword == null || keyword === '') return default_querykeys;
  return [...default_querykeys, keyword];
};
