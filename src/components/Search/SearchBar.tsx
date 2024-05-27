import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useSearch } from '@/hooks/useSearch';
import { Dispatch, SetStateAction } from 'react';

export default function SearchBar({
  searchWord,
  setSearchWord,
  handleSearchKeyword,
}: {
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  handleSearchKeyword: () => void;
}) {
  const { defaultSearchWord, useDefaultKeySearch, handleUseDefaultKeySearch } =
    useSearch();

  return (
    <>
      <Input
        useDefaultValue={useDefaultKeySearch}
        defaultSearchWord={defaultSearchWord}
        value={searchWord}
        onChange={e => setSearchWord(e.target.value)}
        onKeyUp={e => e.key === 'Enter' && handleSearchKeyword()}
        onKeyDown={handleUseDefaultKeySearch}
      />
      <Button outline onClick={handleSearchKeyword}>
        검색
      </Button>
    </>
  );
}
