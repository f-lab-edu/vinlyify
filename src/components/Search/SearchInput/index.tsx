import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import { useDebounce } from '@/hooks/useDebounce';
import classNames from 'classnames/bind';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from './Input';
import Style from './search-input.module.scss';

const style = classNames.bind(Style);

export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
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
    if (keyword) {
      searchParams.set('keyword', keyword);
      setSearchParams(searchParams);
    }
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
    <div className={style('search-input')}>
      <Input
        value={keyword ?? placeHolder}
        placeHolder={placeHolder}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    </div>
  );
}
