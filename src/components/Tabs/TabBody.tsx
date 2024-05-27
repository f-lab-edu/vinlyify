import { DEFAULT_TAB } from '@/constants';
import { SearchResult } from '@/models/searchResult';
import { Dispatch, SetStateAction } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import TabContent from './TabContent';
import TabHeadList from './TabHeadList';

export default function TabBody({
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
  return (
    <>
      <TabHeadList
        searchResult={searchResult}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
      <TabContent searchResult={searchResult} currentTab={currentTab} />
    </>
  );
}
