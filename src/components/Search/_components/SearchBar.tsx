import { URL_PARAMS } from '@/constants/url';
import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import { useDebounce } from '@/hooks/useDebounce';
import { useErrorNotifications } from '@/hooks/useErrorNotifications';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingIcon from '../../_shared/Icons/Loading';

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');

  const { data, refetch, isLoading, isError, error } = useSearchKeyword();
  const { showErrorToast } = useErrorNotifications({
    errorMsg: error?.message,
    isError,
    toastId: error?.name,
  });
  if (isError) {
    showErrorToast();
  }

  // placeholder = last keyword from API response
  const placeHolder = useMemo(() => {
    const defaultSearchWord = data?.albums?.href.match(
      /(?<=(query=)).*(?=&type)/,
    );
    return defaultSearchWord
      ? decodeURI(defaultSearchWord[0].replaceAll('+', ' '))
      : '';
  }, [data]);

  const debouncedRequest = useDebounce(
    () => {
      const params = new URLSearchParams(searchParams);
      if (keyword !== '') {
        params.set(URL_PARAMS.KEYWORD, keyword);
      }
      if (keyword) {
        refetch();
      }

      setSearchParams(params);
    },
    [searchParams, keyword],
    1_500,
  );

  useEffect(() => {
    if (keyword === '' && placeHolder != null) {
      searchParams.set(URL_PARAMS.KEYWORD, placeHolder);
      setSearchParams(searchParams);
    }
    console.log('placeHolder', placeHolder, 'keyword', keyword);
  }, [placeHolder, keyword, searchParams]);

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    setKeyword(e.target.value);
    debouncedRequest();
  };

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') debouncedRequest();
  };

  return (
    <div className="w-full inline-flex justify-center bg-(--light-grey-100) pt-6 pb-6 pr-4 pl-4">
      <div
        className={`w-full inline-flex justify-center rounded-[4px] ${isLoading ? 'bg-(--grey-600)' : 'bg-(--color-white)'}`}
      >
        <input
          name="song-search-bar"
          className="w-full inline-block p-1.5 disabled:bg-(--grey-600) disabled:text-(--grey-100)"
          value={keyword || ''}
          placeholder={placeHolder}
          onChange={onChange}
          disabled={isLoading}
          onKeyUp={onKeyUp}
        />
        {isLoading && <LoadingIcon />}
      </div>
    </div>
  );
}
