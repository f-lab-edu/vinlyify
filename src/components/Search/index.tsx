import { useSearch } from '@/hooks/useSearch';
import SearchBar from './SearchBar';
import Tabs from './Tabs';

export default function Search() {
  const { handleSearchKeyword, setSearchWord, searchWord, searchResult } =
    useSearch();

  return (
    <>
      <SearchBar
        handleSearchKeyword={handleSearchKeyword}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
      <Tabs searchResult={searchResult} />
    </>
  );
}
