const ERROR_NAMES = {
  400: 'SPOTIFY_ERROR_BAD_REQUEST',
  401: 'SPOTIFY_ERROR_INVALID_TOKEN',
  429: 'SPOTIFY_ERROR_TOO_MANY_REQUESTS',
  403: 'SPOTIFY_ERROR_BAD_OAUTH_REQUEST',
  500: 'SPOTIFY_ERROR_INTERNAL_SEVER_ERROR',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  NETWORK_ERROR:
    'Network error, unable to reach the server. Please check your connection.',
};

export default ERROR_NAMES;
