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

  const allTabSearchData: SearchResult | undefined = queryClient.getQueryData(
    useSearchKeyword.queryKey(currentKeyword),
  );

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
