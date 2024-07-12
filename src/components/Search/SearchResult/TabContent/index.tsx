import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import { Album } from '@/models/Album';
import { Pagination } from '@/models/Pagination';
import { Playlist } from '@/models/Playlist';
import { Artist } from '@/models/Profile';
import { SearchResult } from '@/models/Spotify';
import { Track } from '@/models/Track';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SCOPE, TAB } from '../../constants';
import Grid from './_shared/Grid';
import InfiniteTab from './_shared/InfiniteTab';
import AlbumTab from './AlbumTab';
import ArtistTab from './ArtistTab';
import PlaylistTab from './PlaylistTab';
import TrackTab from './TrackTab';

export type TabItem = Album[] | Artist[] | Track[] | Playlist[];
export type TabList = ({ tabItem }: { tabItem: TabItem }) => JSX.Element[];

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
    component: PlaylistTab,
  },
] as { tab: keyof SearchResult; label: string; component: TabList }[];

export default function TabContent() {
  const { data, isFetched, isLoading } = useSearchKeyword();
  const [searchParam] = useSearchParams();
  const [currentTab, setCurrentTab] = useState(tab[0]);
  const [currentTabPagingInfo, setCurrentTabPagingInfo] =
    useState<Pagination | null>(null);
  const [currentTabItem, setCurrentTabItem] = useState<TabItem | null>(null);

  useEffect(() => {
    const changedTab = tab.filter(
      tabItem => searchParam.get(SCOPE) === tabItem.tab,
    );
    if (isFetched && data != null) {
      const { items, ...pageInfo } =
        data[(searchParam.get(SCOPE) ?? tab[0].tab) as keyof SearchResult];
      setCurrentTabPagingInfo(pageInfo);
      setCurrentTabItem(items);
    }

    if (changedTab.length === 0) {
      setCurrentTab(tab[0]);
    } else {
      setCurrentTab(changedTab[0]);
    }
  }, [searchParam, data, isFetched]);

  if (isLoading || currentTabPagingInfo == null || currentTabItem == null) {
    return <Grid.Skeleton />;
  }

  return (
    <InfiniteTab
      TabList={currentTab.component}
      tab={currentTab.tab}
      tabItem={currentTabItem}
      currentTabPagingInfo={currentTabPagingInfo}
    />
  );
}
