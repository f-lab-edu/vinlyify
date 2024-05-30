import { useSearchKeyword } from '@/query/useSearchKeyword';
import { debounce } from '@/utils';
import { useMemo, useState } from 'react';

export default function SearchInput() {
  const [keyword, setKeyword] = useState('');
  const { refetch, data } = useSearchKeyword(keyword);
  const onHandleSearch = () => refetch();

  const debounceSearch = debounce(() => onHandleSearch(), 1_000);

  const placeHolder = useMemo(() => {
    const defaultSearchWord = data?.albums?.href.match(
      /(?<=(query=)).*(?=&type)/,
    );
    const dsw =
      defaultSearchWord != null
        ? `${defaultSearchWord[0].replace('+', ' ')}`
        : '';
    return dsw;
  }, [data?.albums?.href]);

  return (
    <>
      <input
        value={keyword}
        placeholder={placeHolder}
        onChange={e => setKeyword(e.target.value)}
        onKeyUp={e => {
          if (e.key === 'Enter') debounceSearch();
        }}
      />
      <button onClick={debounceSearch}>검색</button>
    </>
  );
}
