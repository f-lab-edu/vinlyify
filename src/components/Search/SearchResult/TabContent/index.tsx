import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import { Pagination } from '@/models/Pagination';
import { SearchResult } from '@/models/Spotify';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SCOPE, TAB } from '../../constants';
import Card from './_shared/Card';

import NothingToShow from '@/components/Main/_shared/NothingToShow/NothingToShow';
import InfiniteList from './_shared/InfiniteList';
import AlbumList from './AlbumTab/AlbumList';
import ArtistList from './ArtistTab/ArtistList';
import PlaylistList from './PlaylistTab/PlaylistList';
import TrackList from './TrackTab/TrackList';

export interface TabProps {
  innerRef?: (node?: Element | null) => void | null;
}

const tab = [
  {
    tab: TAB.ALBUMS,
    label: '앨범',
    component: AlbumList,
  },
  {
    tab: TAB.ARTISTS,
    label: '아티스트',
    component: ArtistList,
  },
  {
    tab: TAB.TRACKS,
    label: '트랙',
    component: TrackList,
  },
  {
    tab: TAB.PLAYLISTS,
    label: '플레이리스트',
    component: PlaylistList,
  },
];

export default function TabContent() {
  const { data, isFetched, isLoading } = useSearchKeyword();
  const [searchParam] = useSearchParams();
  const [currentTab, setCurrentTab] = useState<(typeof tab)[0]>(tab[0]);
  const [currentTabPagingInfo, setCurrentTabPagingInfo] =
    useState<Pagination | null>(null);
  const [currentTabItem, setCurrentTabItem] = useState<
    SearchResult[keyof SearchResult]['items'] | null
  >(null);

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

  if (isLoading || currentTabPagingInfo == null) {
    return Array.from({ length: 20 }, (_, index) => (
      <Card.Skeleton key={index} />
    ));
  }

  if (currentTabItem == null) {
    return (
      <NothingToShow
        message={
          searchParam.has('keyword')
            ? `'${searchParam.get('keyword')}'에 해당하는 검색결과가 없습니다.`
            : '검색 결과가 없습니다.'
        }
      />
    );
  }

  return (
    <InfiniteList
      tabItem={currentTabItem}
      currentTab={currentTab.tab as keyof SearchResult}
      currentTabPagingInfo={currentTabPagingInfo}
      TabList={currentTab.component}
    />
  );
}
