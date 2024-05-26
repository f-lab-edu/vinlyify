import {
  API,
  PAGE,
  SPOTIFY_WEB_API,
  TOKEN_VALID_TIME,
  VINYLIFY_TOKEN,
} from '@/constants';

import { useCallback, useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

export const BaseLayout = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [remainingTime, setRemainingTime] = useState(
    BigInt(localStorage.getItem(TOKEN_VALID_TIME) ?? 0) -
      BigInt(new Date().getTime()),
  );

  const logout = useCallback(() => {
    if (!remainingTime) return;
    localStorage.removeItem(TOKEN_VALID_TIME);
    localStorage.removeItem(VINYLIFY_TOKEN);
    navigate(PAGE.MAIN);
  }, [remainingTime, navigate]);

  useEffect(() => {
    // 로그인 시에 access token 로컬 스토리지에 저장
    if (
      location.pathname === PAGE.LOGGED_IN &&
      searchParams.has('access_token')
    ) {
      const access_token = searchParams.get('access_token') as string;
      SPOTIFY_WEB_API.setAccessToken(access_token);
      localStorage.setItem(VINYLIFY_TOKEN, access_token);
      localStorage.setItem(
        TOKEN_VALID_TIME,
        `${new Date().getTime() + 60 * 60 * 1000}`,
      );
      return;
    }
    // console.log(remainingTime);
    const currentTime = BigInt(new Date().getTime());
    const validTime = localStorage.getItem(TOKEN_VALID_TIME);
    if (!validTime) return navigate(PAGE.MAIN);
    const validTimeToBigInt =
      validTime?.length > 0 ? BigInt(validTime) : currentTime;
    setRemainingTime(validTimeToBigInt - currentTime);
    if (validTimeToBigInt - currentTime <= BigInt(0)) logout();
  }, [logout, navigate, location.pathname, searchParams, remainingTime]);

  return !searchParams.has('access_token') &&
    !localStorage.getItem('vinylify_token_valid_time') ? (
    <>
      <header>
        <Link to={PAGE.MAIN}>home</Link>
        <Link to={API.LOGIN}>login to spotify</Link>
      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  ) : (
    <>
      <header>
        <Link to={PAGE.MAIN}>home</Link>
        <Link to={PAGE.SEARCH}>search</Link>

        <Link to={PAGE.MUSIC_INFO}>currently playing</Link>
        <button onClick={logout}> logout</button>
      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  );
};
