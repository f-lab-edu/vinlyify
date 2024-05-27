import { searchFromMyTopOne, searchKeyword } from '@/api/spotify';
import { URL_PARAMS } from '@/constants';
import { SearchResult } from '@/models/searchResult';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState<string>(
    searchParams.get(URL_PARAMS.KEYWORD) ?? '',
  );
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [defaultSearchWord, setDefaultSearchWord] = useState<string>('');

  const [useDefaultKeySearch, setUseDefaultKeySearch] = useState(true);

  const handleUseDefaultKeySearch = useCallback(() => {
    if (useDefaultKeySearch) setUseDefaultKeySearch(false);
  }, [useDefaultKeySearch]);

  /**
   * 디폴트 검색 기록으로 설정
   */
  const getDefaultSearch = () => {
    searchFromMyTopOne().then(v => {
      const { keyword, response } = v;
      setDefaultSearchWord(keyword);
      setSearchResult(response);
    });
  };

  useEffect(() => {
    if (
      searchWord === '' &&
      defaultSearchWord === '' &&
      !searchParams.get(URL_PARAMS.KEYWORD)
    ) {
      getDefaultSearch();
    }
  }, [
    searchParams,
    defaultSearchWord,
    searchWord,
    searchResult,
    setDefaultSearchWord,
    setSearchResult,
  ]);

  /**
   * 검색어를 url param으로 추가하기
   * */
  const handleSearchKeyword = useCallback(() => {
    searchKeyword(searchWord).then(v => setSearchResult(v));
    setSearchParams([
      ...[...searchParams].filter(v => v[0] !== URL_PARAMS.KEYWORD),
      [URL_PARAMS.KEYWORD, searchWord],
    ]);
  }, [searchWord, searchParams, setSearchParams, setSearchResult]);

  /**
   * 새로고침, 뒤로 가기, 검색창에 직접 입력 시에 url param에 검색어 정보를 가져오기
   */
  useMemo(() => {
    if (searchParams.get(URL_PARAMS.KEYWORD)) {
      setSearchWord(`${searchParams.get(URL_PARAMS.KEYWORD)}`);
      searchKeyword(`${searchParams.get(URL_PARAMS.KEYWORD)}`).then(v =>
        setSearchResult(v),
      );
    } else {
      // '/search'로 뒤로 가기했을 경우 검색어 제거
      setSearchWord('');
      getDefaultSearch();
    }
  }, [searchParams, setSearchResult, setSearchWord]);

  return {
    searchParams,
    handleSearchKeyword,
    setSearchParams,
    searchWord,
    setSearchWord,
    useDefaultKeySearch,
    handleUseDefaultKeySearch,
    defaultSearchWord,
    setDefaultSearchWord,
    searchResult,
    setSearchResult,
  };
}
