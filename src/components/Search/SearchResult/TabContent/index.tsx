import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import { Pagination } from '@/models/Pagination';
import { SearchResult } from '@/models/Spotify';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SCOPE, TAB } from '../../constants';
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
  const [searchParam] = useSearchParams();
  const [currentTab, setCurrentTab] = useState<TabType>(tab[0]);
  const [currentTabPagingInfo, setCurrentTabPagingInfo] =
    useState<Pagination | null>(null);
  const [currentTabItem, setCurrentTabItem] = useState<CurrentTabType>(null);

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

  if (isLoading) {
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
