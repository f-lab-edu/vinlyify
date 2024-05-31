import { URL_PARAMS } from '@/constants';
import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import { useSearchParams } from 'react-router-dom';

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const { data } = useSearchKeyword(
    searchParams.has(URL_PARAMS.KEYWORD)
      ? searchParams.get(URL_PARAMS.KEYWORD)
      : '',
  );

  return <>{JSON.stringify(data)}</>;
}
