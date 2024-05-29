import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useSearch } from '@/hooks/useSearch';
import { debounce } from '@/utils';
import { Dispatch, SetStateAction } from 'react';
import FlexWrap from '../common/FlexWrap';

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

  const debounceSearch = debounce(() => handleSearchKeyword(), 500);

  return (
    <FlexWrap center="center">
      <Input
        useDefaultValue={useDefaultKeySearch}
        defaultSearchWord={defaultSearchWord}
        value={searchWord}
        onChange={e => setSearchWord(e.target.value)}
        onKeyUp={e => {
          if (e.key === 'Enter') debounceSearch();
        }}
        onKeyDown={handleUseDefaultKeySearch}
      />
      <Button outline onClick={debounceSearch}>
        검색
      </Button>
    </FlexWrap>
  );
}
