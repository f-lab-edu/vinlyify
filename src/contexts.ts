import { createContext } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

export const spotifyWebApi = new SpotifyWebApi();

/**
 * spotifyWebApi 상태 컨텍스트
 */
export const SpotifyContext = createContext({
  spotifyWebApi,
});
