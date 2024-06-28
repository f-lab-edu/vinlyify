import { URL_PARAMS } from '@/constants/url';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useCurrentKeyword from './useCurrentKeyword';
import useCurrentTab from './useCurrentTab';

const useCurrentPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentTab = useCurrentTab();
  const currentKeyword = useCurrentKeyword();

  const handlePageChange = (page: string) => {
    searchParam.set(URL_PARAMS.PAGE, page);
    setSearchParam(searchParam);
  };

  return {
    currentPage: useMemo(() => {
      return searchParam.get(URL_PARAMS.PAGE) ?? 1;
    }, [currentTab, currentKeyword, searchParam.get(URL_PARAMS.PAGE)]),
    handlePageChange,
  };
};
export default useCurrentPage;
