import { TAB } from '@/components/Search/constants';
import { URL_PARAMS } from '@/constants/url';
import { SearchResult } from '@/models/Spotify';
import { useSearchParams } from 'react-router-dom';

const useCurrentTab = () => {
  const [searchParam] = useSearchParams();

  return (
    searchParam.has(URL_PARAMS.SCOPE) &&
    Object.values(TAB).includes(searchParam.get(URL_PARAMS.SCOPE) ?? '')
      ? searchParam.get(URL_PARAMS.SCOPE)
      : TAB['ALBUMS']
  ) as keyof SearchResult;
};
export default useCurrentTab;
