import { Outlet } from 'react-router-dom';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

export const BaseLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollToTop />
    </>
  );
};
