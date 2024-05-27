import { DEFAULT_TAB, URL_PARAMS } from '@/constants';
import { SearchResult } from '@/models/searchResult';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import TabBodyWrap from '../common/Tab';
import TabHead from '../common/Tab/TabHead';
import TabListItem from '../common/Tab/TabListItem';

export default function TabHeadList({
  searchResult,
  currentTab = DEFAULT_TAB,
  setCurrentTab,
  setSearchParams,
  searchParams,
}: {
  searchResult: SearchResult;
  currentTab: 'albums' | 'artists' | 'tracks' | 'playlists';
  setCurrentTab: Dispatch<SetStateAction<keyof SearchResult>>;
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
}) {
  const tabs = Object.keys(searchResult);

  const tabChangeHandler = useCallback(
    (tab: keyof SearchResult) => {
      setCurrentTab(tab as keyof SearchResult);
      setSearchParams([
        ...[...searchParams].filter(v => v[0] !== URL_PARAMS.SCOPE),
        [URL_PARAMS.SCOPE, tab],
      ]);
    },
    [setCurrentTab, setSearchParams, searchParams],
  );

  return (
    <TabBodyWrap>
      <TabHead>
        {tabs.map(tab => (
          <TabListItem
            key={tab}
            focused={tab === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => tabChangeHandler(tab as keyof SearchResult)}
          >
            {tab}
          </TabListItem>
        ))}
      </TabHead>
    </TabBodyWrap>
  );
}
