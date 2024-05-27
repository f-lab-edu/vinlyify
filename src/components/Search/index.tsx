import { searchKeyword } from '@/api/spotify';
import { SearchResult } from '@/models/searchResult';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import Tabs from './Tabs';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState<string>(
    searchParams.get('keyword') ?? '',
  );
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [defaultSearchWord, setDefaultSearchWord] = useState<string>('');

  /**
   * 검색어를 url param으로 추가하기
   * */
  const handleSearchKeyword = useCallback(() => {
    searchKeyword(searchWord).then(v => setSearchResult(v));
    setSearchParams([
      ...[...searchParams].filter(v => v[0] !== 'keyword'),
      ['keyword', searchWord],
    ]);
  }, [searchWord, searchParams, setSearchParams]);

  /**
   * 새로고침, 뒤로 가기, 검색창에 직접 입력 시에 url param에 검색어 정보를 가져오기
   */
  useMemo(() => {
    if (searchParams.get('keyword')) {
      setSearchWord(`${searchParams.get('keyword')}`);
      searchKeyword(`${searchParams.get('keyword')}`).then(v =>
        setSearchResult(v),
      );
    }
  }, [searchParams]);

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
