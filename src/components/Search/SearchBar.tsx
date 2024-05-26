import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
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
  return (
    <>
      <Input value={searchWord} onChange={e => setSearchWord(e.target.value)} />
      <Button outline onClick={handleSearchKeyword}>
        검색
      </Button>
    </>
  );
}
