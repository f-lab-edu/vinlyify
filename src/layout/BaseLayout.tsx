import { API, PAGE } from '@/constants';
import { useAuth } from '@/hooks/useAuth';

import { Link, Outlet } from 'react-router-dom';

const logIn = () => {
  window.location.replace(API.LOGIN);
};

export const BaseLayout = () => {
  const { data, logOut } = useAuth();

  return (
    <>
      <header>
        <Link to={PAGE.MAIN}>home</Link>
        {!data ? (
          <button onClick={logIn}>login</button>
        ) : (
          <>
            <Link to={PAGE.SEARCH}>search</Link>
            <Link to={PAGE.MUSIC_INFO}>currently playing</Link>
            <button onClick={logOut}> logout</button>
          </>
        )}
      </header>
      <Outlet />

      {/* <footer>footer</footer> */}
    </>
  );
};
