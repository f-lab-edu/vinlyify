import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useState } from 'react';

export default function SearchBar() {
  const [searchWord, setSearchWord] = useState<string>('');
  return (
    <>
      <Input value={searchWord} onChange={e => setSearchWord(e.target.value)} />
      <Button outline onClick={() => console.log('hehe')}>
        검색
      </Button>
    </>
  );
}
