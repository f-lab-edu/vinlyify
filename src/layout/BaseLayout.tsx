import useScrollToTop from '@/hooks/useScrollToTop';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export const BaseLayout = () => {
  useScrollToTop();
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
