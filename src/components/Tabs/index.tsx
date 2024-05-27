import { URL_PARAMS } from '@/constants';
import { SearchResult } from '@/models/searchResult';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loading } from '../Main';
import TabBody from './TabBody';

export default function Tabs({
  searchResult,
}: {
  searchResult: SearchResult | null;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState<keyof SearchResult>(
    (searchParams.get(URL_PARAMS.SCOPE) as keyof SearchResult) ?? 'albums',
  );

  useEffect(() => {
    if (searchParams.get(URL_PARAMS.SCOPE)) {
      setCurrentTab(searchParams.get(URL_PARAMS.SCOPE) as keyof SearchResult);
    }
  }, [searchParams]);

  if (!searchResult) return <Loading />;
  return (
    <TabBody
      searchResult={searchResult}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      setSearchParams={setSearchParams}
      searchParams={searchParams}
    />
  );
}
