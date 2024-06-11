import SpotifyWebApi from 'spotify-web-api-js';

export const VINYLIFY_TOKEN = 'vinylify_token';
export const TOKEN_VALID_TIME = 'vinylify_token_valid_time';

export const API = {
  LOGIN: 'http://localhost:8888/',
  SPOTIFY: 'https://api.spotify.com/v1/',
};
export const PAGE = {
  MAIN: '/',
  ERROR: '/error',
  MYPAGE: '/mypage',
  SEARCH: '/search',
  MUSIC_INFO: '/music-info',
  LOGGED_IN: '/me',
};

export const URL_PARAMS = {
  KEYWORD: 'keyword',
  SCOPE: 'scope',
};

export const DEFAULT_PLAY_TRACK = 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr';

export const SPOTIFY_WEB_API = new SpotifyWebApi();

export const ACCESS_TOKEN = 'access_token';

export const PLACEHOLDER_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
