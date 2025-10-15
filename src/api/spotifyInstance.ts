import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import ERROR_NAMES from '@/config/ERROR_NAMES';
import { SPOTIFY_WEB_API, VINYLIFY_TOKEN } from '@/constants';
import { API } from '@/constants/url';

import ky from 'ky';

export const api = ky.extend({
  prefixUrl: API.SPOTIFY,
  hooks: {
    beforeError: [
      error => {
        const { response } = error;
        if (response && response.body) {
          switch (response.status) {
            case 429:
            case 500:
              error.name = ERROR_NAMES[response.status];
              error.message = ERROR_MESSAGES[response.status]; // toast만 띄우기
              return error;
            case 401:
            case 403:
              SPOTIFY_WEB_API.setAccessToken(null);
              localStorage.removeItem(VINYLIFY_TOKEN);
              error.name = ERROR_NAMES[response.status];
              error.message = ERROR_MESSAGES[response.status]; // 에러
              return error;
            default:
              error.name = ERROR_NAMES.GENERIC_ERROR;
              error.message =
                ERROR_MESSAGES.GENERIC_ERROR + `: ${error.message}`;
              return error;
          }
        }
        return error;
      },
    ],
    beforeRequest: [
      req => {
        return req.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem(VINYLIFY_TOKEN)}`,
        );
      },
    ],
  },
});

SPOTIFY_WEB_API.setAccessToken(localStorage.getItem(VINYLIFY_TOKEN));
