import SpotifyWebApi from 'spotify-web-api-js';

export const VINYLIFY_TOKEN = 'vinylify_token';
export const TOKEN_VALID_TIME = 'vinylify_token_valid_time';

export const UID = import.meta.env.VITE_UID;
export const TOKEN_ID = import.meta.env.VITE_TOKEN_ID;
export const API_KEY = import.meta.env.VITE_API_KEY;

export const GENIUS_CLIENT_ID = import.meta.env.VITE_GENIUS_CLIENT_ID;
export const GENIUS_CLIENT_SECRET = import.meta.env.VITE_GENIUS_CLIENT_SECRET;
export const GENIUS_CLIENT_ACCESS_TOKEN = import.meta.env
  .VITE_GENIUS_CLIENT_ACCESS_TOKEN;

export const DEFAULT_PLAY_TRACK = 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr';

export const SPOTIFY_WEB_API = new SpotifyWebApi();

export const ACCESS_TOKEN = 'access_token';
