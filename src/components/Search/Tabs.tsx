import { searchFromMyTopOne } from '@/api/spotify';
import { SearchResult } from '@/models/searchResult';
import { Dispatch, useEffect } from 'react';

export default function Tabs({
  searchResult,
  searchWord,
  defaultSearchWord,
  setSearchResult,
  setDefaultSearchWord,
}: {
  searchWord: string;
  defaultSearchWord: string;
  searchResult: SearchResult | null;
  setSearchResult: Dispatch<React.SetStateAction<SearchResult | null>>;
  setDefaultSearchWord: Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    if (searchWord === '' && defaultSearchWord === '') {
      searchFromMyTopOne().then(v => {
        const { keyword, response } = v;
        setDefaultSearchWord(keyword);
        setSearchResult(response);
      });
    }
  }, [
    defaultSearchWord,
    searchWord,
    searchResult,
    setDefaultSearchWord,
    setSearchResult,
  ]);

  return <div>{JSON.stringify(searchResult)}</div>;
}
