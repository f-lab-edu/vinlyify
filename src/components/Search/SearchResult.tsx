import { useSearchKeyword } from '@/query/useSearchKeyword';

export default function SearchResult() {
  const { data } = useSearchKeyword('');

  return <>{JSON.stringify(data)}</>;
}
