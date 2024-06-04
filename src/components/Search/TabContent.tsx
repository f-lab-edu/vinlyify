import { useInfiniteTabList } from '@/hooks/query/useInfiniteTabList';
import { useSearchParams } from 'react-router-dom';
import { SCOPE, TAB } from './constants';

export default function TabContent() {
  const { data } = useInfiniteTabList();
  const [searchParam] = useSearchParams();

  switch (searchParam.get(SCOPE)) {
    case TAB.ALBUMS:
      return <>{JSON.stringify(data)}</>;
    case TAB.ARTISTS:
      return <>{JSON.stringify(data)}</>;
    case TAB.PLAYLISTS:
      return <>{JSON.stringify(data)}</>;
    case TAB.TRACKS:
      return <>{JSON.stringify(data)}</>;
    default:
      return <>{JSON.stringify(data)}</>;
  }
}
