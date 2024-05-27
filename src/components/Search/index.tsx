import { useSearch } from '@/hooks/useSearch';
import Tabs from '../Tabs';
import SearchBar from './SearchBar';

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
      {searchResult ? (
        <Tabs searchResult={searchResult} />
      ) : (
        <>nothing to show...</>
      )}
    </>
  );
}
