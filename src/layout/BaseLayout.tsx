import { Outlet } from 'react-router-dom';

export const BaseLayout = () => {
  return (
    <>
      <header>header</header>
      <Outlet />
      <footer>footer</footer>
    </>
  );
};
