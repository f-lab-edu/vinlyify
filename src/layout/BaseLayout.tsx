import {
  ACCESS_TOKEN,
  API,
  PAGE,
  SPOTIFY_WEB_API,
  VINYLIFY_TOKEN,
} from '@/constants';
import { useEffect } from 'react';

import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom';

export const BaseLayout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname == PAGE.LOGGED_IN && searchParams.has(ACCESS_TOKEN)) {
      localStorage.setItem(VINYLIFY_TOKEN, `${searchParams.get(ACCESS_TOKEN)}`);
      SPOTIFY_WEB_API.setAccessToken(`${searchParams.get(ACCESS_TOKEN)}`);
      navigate(PAGE.MAIN);
    }
  }, [searchParams, navigate]);

  const onHandleLogin = () => {
    window.location.replace(API.LOGIN);
  };

  const onHandleLogOut = () => {
    localStorage.removeItem(VINYLIFY_TOKEN);
    SPOTIFY_WEB_API.setAccessToken(null);
    window.location.replace(API.LOGIN);
  };

  return (
    <>
      {!SPOTIFY_WEB_API.getAccessToken() ? (
        <header>
          <Link to={PAGE.MAIN}>home</Link>
          <button onClick={onHandleLogin}>login</button>
        </header>
      ) : (
        <header>
          <Link to={PAGE.MAIN}>home</Link>
          <Link to={PAGE.SEARCH}>search</Link>
          <Link to={PAGE.MUSIC_INFO}>currently playing</Link>
          <button onClick={onHandleLogOut}> logout</button>
        </header>
      )}
      <Outlet />

      <footer>footer</footer>
    </>
  );
};
