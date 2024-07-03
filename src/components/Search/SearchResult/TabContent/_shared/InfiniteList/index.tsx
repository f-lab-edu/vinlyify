import { useInfiniteSearchList } from '@/hooks/query/useInfiniteSearchList';
import { Pagination } from '@/models/Pagination';
import { SearchResult } from '@/models/Spotify';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import InfiniteCardSkeleton from './InfiniteCardSkeleton';

interface InfiniteListProps {
  tabItem: SearchResult[keyof SearchResult]['items'];
  currentTabPagingInfo: Pagination;
  TabList: JSX.ElementType;
  currentTab: keyof SearchResult;
}

const InfiniteList = ({
  tabItem,
  currentTabPagingInfo,
  TabList,
  currentTab,
}: InfiniteListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteSearchList(currentTabPagingInfo?.href);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const content = data?.pages.map(page => (
    <TabList
      innerRef={ref}
      key={page?.[currentTab]?.href}
      tabItem={page?.[currentTab].items}
    />
  ));

  if (!data) {
    return <TabList tabItem={tabItem} />;
  }

  return (
    <>
      {content}
      {isFetchingNextPage ? <>{InfiniteCardSkeleton}</> : null}
    </>
  );
};

export default InfiniteList;
