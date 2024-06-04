import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import { useDebounce } from '@/hooks/useDebounce';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useMemo,
  useState,
} from 'react';

export default function SearchInput() {
  const [keyword, setKeyword] = useState('');
  const { refetch, data } = useSearchKeyword(keyword);

  const placeHolder = useMemo(() => {
    const defaultSearchWord = data?.albums?.href.match(
      /(?<=(query=)).*(?=&type)/,
    );
    const dsw =
      defaultSearchWord != null
        ? `${defaultSearchWord[0].replaceAll('+', ' ')}`
        : '';
    return decodeURI(dsw);
  }, [data?.albums?.href]);

  const debouncedRequest = useDebounce(() => {
    refetch();
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const value = e.target.value;
    setKeyword(value);
    debouncedRequest();
  };

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') debouncedRequest();
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    debouncedRequest();
  };

  return (
    <>
      <input
        value={keyword}
        placeholder={placeHolder}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      <button onClick={onClick}>검색</button>
    </>
  );
}
