import { DEFAULT_TAB } from '@/constants';
import { SearchResult } from '@/models/searchResult';
import TabContentWrap from '../common/Tab/TabContentWrap';
import AlbumTab from './AlbumTab';
import ArtistTab from './ArtistTab';

export default function TabContent({
  searchResult,
  currentTab = DEFAULT_TAB,
}: {
  searchResult: SearchResult;
  currentTab: 'albums' | 'artists' | 'tracks' | 'playlists';
}) {
  switch (currentTab) {
    case 'albums':
      return <AlbumTab tabItem={searchResult[currentTab]} />;
    case 'artists':
      return <ArtistTab tabItem={searchResult[currentTab]} />;
    case 'playlists':
      return (
        <TabContentWrap>
          {JSON.stringify(searchResult[currentTab])}
        </TabContentWrap>
      );
    case 'tracks':
      return (
        <TabContentWrap>
          {JSON.stringify(searchResult[currentTab])}
        </TabContentWrap>
      );
    default:
      <TabContentWrap>
        <AlbumTab tabItem={searchResult[DEFAULT_TAB]} />
      </TabContentWrap>;
  }
}
