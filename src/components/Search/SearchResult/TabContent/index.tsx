import { usePagination } from '@/hooks/query/usePagination';
import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import useCurrentPage from '@/hooks/searchParams/useCurrentPage';
import useCurrentTab from '@/hooks/searchParams/useCurrentTab';
import { Pagination } from '@/models/Pagination';
import { useEffect, useState } from 'react';
import { TAB } from '../../constants';
import AlbumTab from './AlbumTab';
import ArtistTab from './ArtistTab';
import PlaylistsTab from './PlaylistTab';
import TrackTab from './TrackTab';
import Card from './_shared/Card';
import Grid from './_shared/Grid';

export type CurrentTabType = JSX.Element['props'];
export type TabType = JSX.Element['props'];

const tab = [
  {
    tab: TAB.ALBUMS,
    label: '앨범',
    component: AlbumTab,
  },
  {
    tab: TAB.ARTISTS,
    label: '아티스트',
    component: ArtistTab,
  },
  {
    tab: TAB.TRACKS,
    label: '트랙',
    component: TrackTab,
  },
  {
    tab: TAB.PLAYLISTS,
    label: '플레이리스트',
    component: PlaylistsTab,
  },
];

export default function TabContent() {
  const { data, isFetched, isLoading } = useSearchKeyword();
  const [currentTab, setCurrentTab] = useState<TabType>(tab[0]);
  const [currentTabPagingInfo, setCurrentTabPagingInfo] =
    useState<Pagination | null>(null);
  const [currentTabItem, setCurrentTabItem] = useState<CurrentTabType>(null);
  const currentTabName = useCurrentTab();
  const pageData = usePagination();

  const { currentPage } = useCurrentPage();

  useEffect(() => {
    if (currentPage != null && pageData != null) {
      const currentPageData = pageData.filter(
        page =>
          page.data?.[currentTabName]?.offset == (Number(currentPage) - 1) * 20,
      )?.[0];
      setCurrentTabItem(currentPageData?.data?.[currentTabName]?.items);
    }
  }, [currentPage, pageData]);

  useEffect(() => {
    const changedTab = tab.filter(tabItem => currentTabName === tabItem.tab);

    if (isFetched && data != null && data[currentTabName] != null) {
      const { items, ...pageInfo } = data[currentTabName];
      setCurrentTabPagingInfo(pageInfo);
      setCurrentTabItem(items);
    }

    if (changedTab.length === 0) {
      setCurrentTab(tab[0]);
    } else {
      setCurrentTab(changedTab[0]);
    }
  }, [currentTabName, data, isFetched]);

  if (isLoading || currentTabPagingInfo == null || currentTabItem == null) {
    return (
      <Grid>
        {Array.from({ length: 20 }, (_, index) => (
          <Card.Skelton key={index} />
        ))}
      </Grid>
    );
  }

  return (
    <currentTab.component
      tabItem={currentTabItem}
      currentTabPagingInfo={currentTabPagingInfo}
    />
  );
}
