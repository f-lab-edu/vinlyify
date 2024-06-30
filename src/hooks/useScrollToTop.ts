import useCurrentKeyword from '@/hooks/searchParams/useCurrentKeyword';
import useCurrentPage from '@/hooks/searchParams/useCurrentPage';
import useCurrentTab from '@/hooks/searchParams/useCurrentTab';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollToTop() {
  const { pathname } = useLocation();
  const { currentPage } = useCurrentPage();
  const currentKeyword = useCurrentKeyword();
  const currentTab = useCurrentTab();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentPage, currentKeyword, pathname, currentTab]);

  return null;
}
