import { SPOTIFY_WEB_API } from '@/constants';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSpotifyAuth = (storageToken?: string | null) => {
  return useSuspenseQuery({
    queryKey: useSpotifyAuth.queryKey(storageToken != null),
    queryFn: () => {
      return SPOTIFY_WEB_API.getAccessToken();
    },
    staleTime: 60_000,
  });
};

useSpotifyAuth.queryKey = (valid?: boolean) => [
  `auth ${valid ? ' ' : 'not'}valid`,
];
