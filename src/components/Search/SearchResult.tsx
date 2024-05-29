import { useSearchKeyword } from '@/query';

export default function SearchResult() {
  const { data } = useSearchKeyword('');

  return <>{JSON.stringify(data)}</>;
}
