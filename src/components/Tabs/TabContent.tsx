import { DEFAULT_TAB } from '@/constants';
import { SearchResult } from '@/models/searchResult';
import TabContentWrap from '../common/Tab/TabContentWrap';

export default function TabContent({
  searchResult,
  currentTab = DEFAULT_TAB,
}: {
  searchResult: SearchResult;
  currentTab: 'albums' | 'artists' | 'tracks' | 'playlists';
}) {
  return (
    <TabContentWrap>{JSON.stringify(searchResult[currentTab])}</TabContentWrap>
  );
}
