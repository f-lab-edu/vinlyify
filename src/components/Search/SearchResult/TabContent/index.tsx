import { useInfiniteTabList } from '@/hooks/query/useInfiniteTabList';
import { Pagination } from '@/models/Pagination';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SCOPE, TAB } from '../../constants';
import AlbumTab from './AlbumTab';
import ArtistTab from './ArtistTab';
import PlaylistsTab from './PlaylistTab';
import TrackTab from './TrackTab';
import GridSkeleton from './_shared/Skeletons/GridSkeleton';

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

// ! 컴포넌트의 프롭스 타입은 타입 Album[] | Tracks[] | Playlist[] | Artist[] | null 인데 컴포넌트에
// ! 쓰면 서로 타입에서 겹치지 않은 부분에서 타입 에러가 발생
// ! 예를 들면 Tracks에서 필수인 속성을 Album에 없다면 타입스크립트가 불평해서
// ! 쓰이는 컴포넌트의 인자의 타입을 따라가도록했는데 더 좋은 타이핑 방법이 있을까?🤔
export type CurrentTabType = (typeof tab)[0]['component']['arguments'] | null;

export default function TabContent() {
  const { data, isFetched } = useInfiniteTabList();
  const [searchParam] = useSearchParams();
  const [currentTab, setCurrentTab] = useState(tab[0]);
  const [currentTabPagingInfo, setCurrentTabPagingInfo] =
    useState<Pagination | null>(null);
  const [currentTabItem, setCurrentTabItem] = useState<CurrentTabType>(null);

  useEffect(() => {
    const changedTab = tab.filter(v => searchParam.get(SCOPE) === v.tab);
    if (isFetched && data !== undefined && 'pages' in data) {
      const { pages } = data;
      const { items, ...pageInfo } = pages[0];
      setCurrentTabPagingInfo(pageInfo);
      setCurrentTabItem(items);
    }

    if (changedTab.length === 0) {
      setCurrentTab(tab[0]);
    } else {
      setCurrentTab(changedTab[0]);
    }
  }, [searchParam, data, isFetched]);

  if (currentTabItem === null || currentTabPagingInfo === null)
    return <GridSkeleton />;

  return (
    <currentTab.component
      tabItem={currentTabItem}
      //     // pagingInfo={currentTabPagingInfo}
    />
  );
}
