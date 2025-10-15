import CoverImage from '@/components/_shared/CoverImage';
import Grid from '@/components/_shared/Grid';
import { useInfiniteSearchList } from '@/hooks/query/useInfiniteSearchList';
import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import { useErrorNotifications } from '@/hooks/useErrorNotifications';
import { Album } from '@/models/Album';
import { Pagination } from '@/models/Pagination';
import { Playlist } from '@/models/Playlist';
import { Artist } from '@/models/Profile';
import { SearchResult } from '@/models/Spotify';
import { Track } from '@/models/Track';
import {
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import VirtualGrid from '../VirtualGrid';
import { DEFAULT_TAB, SCOPE, TAB } from './constants';
import GridItems from './GridItems';

export type TabItem = Album[] | Artist[] | Track[] | Playlist[];
export type TabList = ({ tabItem }: { tabItem: TabItem }) => ReactNode[];

const TAB_ITEMS = Object.values(TAB);

export default function TabSelection() {
  const tabs = useMemo(() => Object.values(TAB), []);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = useMemo(() => {
    if (
      searchParams.has(SCOPE) &&
      TAB_ITEMS.includes(searchParams.get(SCOPE) as string)
    ) {
      return searchParams.get(SCOPE) ?? DEFAULT_TAB;
    } else {
      searchParams.set('scope', DEFAULT_TAB);
      setSearchParams(searchParams);
      return DEFAULT_TAB;
    }
  }, [searchParams, setSearchParams]) as keyof SearchResult;

  const handleSelectMenu = useCallback(
    (item: string) => {
      const searchParamKeyValuePair = [...searchParams].reduce(
        (acc, curr) => {
          const [key, val] = curr;
          acc[key] = val;
          return acc;
        },
        {} as { [key: string]: string },
      );
      setSearchParams({
        ...searchParamKeyValuePair,
        scope: item,
      });
    },
    [searchParams, setSearchParams],
  );

  const { data, isFetched, isLoading, isError, error } = useSearchKeyword();
  const { showErrorToast } = useErrorNotifications({
    isError,
    errorMsg: error?.message,
    toastId: error?.name,
  });

  const [currentTabPagingInfo, setCurrentTabPagingInfo] =
    useState<Pagination | null>(null);
  const [currentTabItem, setCurrentTabItem] = useState<TabItem | null>(null);

  useEffect(() => {
    if (isFetched && data != null) {
      const { items, ...pageInfo } = data[currentTab] as Pagination & {
        items: TabItem;
      };
      setCurrentTabPagingInfo(pageInfo);
      setCurrentTabItem(items);
    }
  }, [data, currentTab, isFetched]);

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteSearchList(
    currentTabPagingInfo?.href.replace(`limit=20`, `limit=${4 * 2 * 2}`),
    4 * 2 * 2,
  );

  const total = useMemo(() => {
    return infiniteData?.pages[0][currentTab]?.total;
  }, [infiniteData, currentTab]);

  useEffect(() => {
    if (total != null) {
      searchParams.set('total', '' + total);
      setSearchParams(searchParams);
    }
  }, [total, searchParams, setSearchParams]);

  const infiniteItems = useMemo(() => {
    return (
      infiniteData?.pages.reduce((acc, page) => {
        return [...acc, ...(page?.[currentTab]?.items ?? [])].filter(v => v);
      }, [] as TabItem) ?? []
    );
  }, [infiniteData, currentTab]);

  const rowCount = useMemo(() => {
    return infiniteData?.pages?.[0]?.[currentTab]?.total ?? 0;
  }, [infiniteData, currentTab]);

  if (isError) {
    showErrorToast();
  }

  return (
    <>
      <ul className="bg-(--light-grey-100) inline-flex flex-row align-middle list-none w-full shadow-(--shadow-tab) h-12">
        {tabs.map(tab => {
          return (
            <li
              key={tab}
              className={`h-full inline-flex w-[25%] p-(--p-fluid-s) first:ml-4 last:mr-4 ${tab === currentTab ? 'shadow-(--shadow-tab-focused) rounded-tl-(--rounded-fluid-s) rounded-tr-(--rounded-fluid-s) bg-(--color-white) text-(--grey-400)' : 'text-(--light-grey-100)'}`}
            >
              <button
                className="border-none w-full text-(length:--text-fluid-xs) text-(--grey-300) hover:cursor-pointer hover:text-(--light-grey-400) p-0 uppercase text-center"
                onClick={() => {
                  handleSelectMenu(tab);
                }}
              >
                {tab}
              </button>
            </li>
          );
        })}
      </ul>

      <Suspense
        fallback={
          <Grid>
            {Array.from({ length: 20 }, (_, index) => (
              <li
                className={`list-none w-full inline-flex flex-col gap-2 m-0 p-0`}
                key={index + '-skeleton'}
              >
                <CoverImage.Skeleton />
                <ul>
                  <li className="wrap">
                    <span className={`inline-block w-full h-4 animate-pulse`} />
                  </li>
                  <span className={`inline-block w-full h-8  animate-pulse`} />
                </ul>
              </li>
            ))}
          </Grid>
        }
      >
        {isLoading ||
        currentTabPagingInfo == null ||
        currentTabItem == null ||
        rowCount == null ? (
          <Grid>
            {Array.from({ length: 20 }, (_, index) => (
              <li
                className={`list-none w-full inline-flex flex-col gap-2 m-0 p-0`}
                key={index + '-skeleton'}
              >
                <CoverImage.Skeleton />
                <ul>
                  <li className="wrap">
                    <span className={`inline-block w-full h-4 animate-pulse`} />
                  </li>
                  <span className={`inline-block w-full h-8  animate-pulse`} />
                </ul>
              </li>
            ))}
          </Grid>
        ) : (
          <VirtualGrid
            isLoading={isLoading}
            isFetching={isFetching}
            id={'vinylify'}
            rowCount={rowCount}
            infiniteItems={infiniteItems}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            GridItem={({ item }) => <GridItems item={item} tab={currentTab} />}
          />
        )}
      </Suspense>
    </>
  );
}
