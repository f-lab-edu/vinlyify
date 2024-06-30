import { URL_PARAMS } from '@/constants/url';
import { useSearchParams } from 'react-router-dom';

const useCurrentKeyword = () => {
  const [searchParam] = useSearchParams();

  return searchParam.get(URL_PARAMS.KEYWORD);
};
export default useCurrentKeyword;
