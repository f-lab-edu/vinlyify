import Container from '@/components/_shared/Container';
import Input from '@/components/_shared/Input';
import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import { useDebounce } from '@/hooks/useDebounce';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SearchInput() {
  const [, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');

  const { data, refetch } = useSearchKeyword();

  const placeHolder = useMemo(() => {
    const defaultSearchWord = data?.albums?.href.match(
      /(?<=(query=)).*(?=&type)/,
    );
    const dsw =
      defaultSearchWord != null
        ? `${defaultSearchWord[0].replaceAll('+', ' ')}`
        : '';
    return decodeURI(dsw);
  }, [data]);

  const debouncedRequest = useDebounce(() => {
    if (keyword) setSearchParams({ keyword });
    refetch();
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const value = e.target.value;
    setKeyword(value);
    debouncedRequest();
  };

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      debouncedRequest();
    }
  };

  return (
    <Container>
      <Input
        value={keyword ?? placeHolder}
        placeHolder={placeHolder}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    </Container>
  );
}