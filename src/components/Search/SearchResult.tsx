import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';

export default function SearchResult() {
  const { data } = useSearchKeyword();

  return <>{JSON.stringify(data)}</>;
}
