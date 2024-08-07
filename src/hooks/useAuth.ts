import { ACCESS_TOKEN, SPOTIFY_WEB_API, VINYLIFY_TOKEN } from '@/constants';
import { API, PAGE } from '@/constants/url';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem(VINYLIFY_TOKEN);
    if (
      data == null &&
      location.pathname == PAGE.LOGGED_IN &&
      searchParams.has(ACCESS_TOKEN)
    ) {
      const access_token = `${searchParams.get(ACCESS_TOKEN)}`;
      localStorage.setItem(VINYLIFY_TOKEN, access_token);
      SPOTIFY_WEB_API.setAccessToken(access_token);
      navigate(PAGE.MAIN);
    }
  }, []);
  const validToken = useMemo(() => {
    if (!SPOTIFY_WEB_API.getAccessToken()) {
      if (
        location.pathname == PAGE.LOGGED_IN &&
        searchParams.has(ACCESS_TOKEN)
      ) {
        const access_token = `${searchParams.get(ACCESS_TOKEN)}`;
        localStorage.setItem(VINYLIFY_TOKEN, access_token);
        SPOTIFY_WEB_API.setAccessToken(access_token);
        navigate(PAGE.MAIN);
        return access_token;
      } else {
        window.location.replace(API.LOGIN);
      }
    } else {
      return SPOTIFY_WEB_API.getAccessToken();
    }
  }, [searchParams, navigate]);

  const logOut = useCallback(() => {
    if (SPOTIFY_WEB_API.getAccessToken()) {
      localStorage.removeItem(VINYLIFY_TOKEN);
      SPOTIFY_WEB_API.setAccessToken(null);
      navigate(PAGE.MAIN);
    }
  }, [navigate]);
  return { data: validToken, logOut };
};
