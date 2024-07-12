import { useInfiniteSearchList } from '@/hooks/query/useInfiniteSearchList';
import { Pagination } from '@/models/Pagination';
import { SearchResult } from '@/models/Spotify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TabItem, TabList } from '../..';
import Card from '../Card';
import Grid from '../Grid';

const InfiniteTab = ({
  TabList,
  tabItem,
  currentTabPagingInfo,
  tab,
}: {
  TabList: TabList;
  tabItem: TabItem;
  currentTabPagingInfo: Pagination;
  tab: keyof SearchResult;
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteSearchList(currentTabPagingInfo.href);

  const infiniteItemList = data?.pages.reduce((acc, page) => {
    return [...acc, ...page?.[tab].items];
  }, [] as TabItem);

  return !infiniteItemList ? (
    <Grid>
      <TabList tabItem={tabItem} />
    </Grid>
  ) : (
    <InfiniteScroll
      next={() => fetchNextPage()}
      hasMore={hasNextPage}
      dataLength={infiniteItemList?.length || 0}
      loader={<></>}
    >
      <Grid>
        <TabList tabItem={infiniteItemList} />
        {isFetchingNextPage &&
          Array.from({ length: 20 }, (_, index) => (
            <Card.Skeleton key={index} />
          ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default InfiniteTab;
