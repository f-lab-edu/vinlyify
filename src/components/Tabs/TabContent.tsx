import { DEFAULT_TAB } from '@/constants';
import { SearchResult } from '@/models/searchResult';
import TabContentWrap from '../common/Tab/TabContentWrap';
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
      return (
        <TabContentWrap>
          {JSON.stringify(searchResult[currentTab])}
        </TabContentWrap>
      );

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
      <ArtistTab tabItem={searchResult[currentTab]} />;
  }
}
