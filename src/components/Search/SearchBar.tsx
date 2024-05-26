import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export default function SearchBar({
  searchWord,
  defaultSearchWord,
  setSearchWord,
  handleSearchKeyword,
}: {
  searchWord: string;
  defaultSearchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  handleSearchKeyword: () => void;
}) {
  const [useDefaultKeySearch, setUseDefaultKeySearch] = useState(true);

  const handleUseDefaultKeySearch = useCallback(() => {
    if (useDefaultKeySearch) setUseDefaultKeySearch(false);
  }, [useDefaultKeySearch]);

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
