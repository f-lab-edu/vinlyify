const ERROR_MESSAGES = {
  400: 'No search query', // SPOTIFY_ERROR_BAD_REQUEST
  401: '세션이 만료되었습니다. 다시 로그인해 주세요.', // SPOTIFY_ERROR_INVALID_TOKEN
  429: '요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.', // SPOTIFY_ERROR_TOO_MANY_REQUESTS
  403: '접속 권한 확인 중 문제가 생겼습니다. 다시 로그인 후 이용해 주세요.', // SPOTIFY_ERROR_BAD_OAUTH_REQUEST
  500: '예기치 못한 서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', // SPOTIFY_ERROR_INTERNAL_SEVER_ERROR
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  NETWORK_ERROR:
    'Network error, unable to reach the server. Please check your connection.',
};

export default ERROR_MESSAGES;
