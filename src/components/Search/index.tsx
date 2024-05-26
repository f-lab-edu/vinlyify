import { searchKeyword } from '@/api/spotify';
import { SearchResult } from '@/models/searchResult';
import { useCallback, useState } from 'react';
import SearchBar from './SearchBar';
import Tabs from './Tabs';

export default function Search() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [defaultSearchWord, setDefaultSearchWord] = useState<string>('');

  const handleSearchKeyword = useCallback(() => {
    searchKeyword(searchWord).then(v => setSearchResult(v));
  }, [searchWord]);

  return (
    <>
      <SearchBar
        handleSearchKeyword={handleSearchKeyword}
        searchWord={searchWord}
        defaultSearchWord={defaultSearchWord}
        setSearchWord={setSearchWord}
      />
      <Tabs
        searchResult={searchResult}
        searchWord={searchWord}
        setSearchResult={setSearchResult}
        defaultSearchWord={defaultSearchWord}
        setDefaultSearchWord={setDefaultSearchWord}
      />
    </>
  );
}
