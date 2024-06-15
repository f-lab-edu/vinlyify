import SpotifyWebApi from 'spotify-web-api-js';

export const VINYLIFY_TOKEN = 'vinylify_token';
export const TOKEN_VALID_TIME = 'vinylify_token_valid_time';

export const UID = import.meta.env.VITE_UID;
export const TOKEN_ID = import.meta.env.VITE_TOKEN_ID;
export const API_KEY = import.meta.env.VITE_API_KEY;

export const API = {
  LOGIN: 'https://vinylify-express.vercel.app/',
  SPOTIFY: 'https://api.spotify.com/v1/',
  STANDS4: `https://www.stands4.com/services/v2/`,
  MUSIX_MATCH: `/music-info/api`,
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

export const ALBUMS = 'albums';
export const ARTISTS = 'artists';
export const TRACKS = 'tracks';
export const PLAYLISTS = 'playlists';

export const TABS = [ALBUMS, ARTISTS, TRACKS, PLAYLISTS] as const;

export const DEFAULT_TAB = ALBUMS;

export const ACCESS_TOKEN = 'access_token';

export const PLACEHOLDER_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
