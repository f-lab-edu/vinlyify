import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from './_components/SearchBar';
import Tab from './_components/Tab';
import { DEFAULT_TAB } from './_components/Tab/constants';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.has('scope')) {
      return;
    }
    searchParams.set('scope', DEFAULT_TAB);
    setSearchParams(searchParams);
  }, [searchParams]);
  return (
    <>
      <SearchBar />
      <Tab />
    </>
  );
}
