import {
  API,
  DEFAULT_PLAY_TRACK,
  SPOTIFY_WEB_API,
  VINYLIFY_TOKEN,
} from '@/constants';

import { Artist } from '@/models/profile';
import { Recommendations } from '@/models/recommendation';
import { SearchResult } from '@/models/searchResult';
import { CurrentlyPlayingTrack, Tracks } from '@/models/track';

import ky, { HTTPError } from 'ky';

const api = ky.extend({
  prefixUrl: `${API.SPOTIFY}v1/`,
  hooks: {
    beforeRequest: [
      req =>
        req.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem(VINYLIFY_TOKEN)}`,
        ),
    ],
    afterResponse: [
      (_, __, res) => {
        console.log(res?.status);
        if (res?.status === 401) {
          console.log('invalid token');
          SPOTIFY_WEB_API.setAccessToken('');
          localStorage.removeItem(VINYLIFY_TOKEN);
          window.location.replace(API.LOGIN);
        } else if (res?.status === 429) {
          console.log('too many requests..');
        }
      },
    ],
  },
});

SPOTIFY_WEB_API.setAccessToken(localStorage.getItem(VINYLIFY_TOKEN));

/**
 *  활성화된 기기 ID 찾기
 */

export async function getActiveDevice() {
  return await SPOTIFY_WEB_API.getMyDevices().then(v => {
    return v.devices.filter(device => {
      return device.is_active;
    })[0]?.id;
  });
}

/**
 * top5 청취기록
 */
export async function getTopTracks(limit = 5) {
  try {
    const getResponse = (await api
      .get(`me/top/tracks?time_range=long_term&limit=${limit}`, {})
      .json()) as Tracks;
    return getResponse;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response.status}`);
  }
}

/**
 * 트랙 재생하기
 */
export async function playTrack({
  context_uris = DEFAULT_PLAY_TRACK,
  active_device,
  offset = { position: 0 },
}: {
  context_uris: string;
  offset?: { uri?: string; position?: number };
  active_device?: string;
}) {
  try {
    const postResponse = await ky
      .post(
        `me/player/play?device_id=${active_device || (await getActiveDevice())}`,
        {
          json: {
            context_uri: context_uris,
            offset,
            position_ms: 0,
          },
        },
      )
      .json();
    console.log(postResponse);

    return postResponse;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response.status}`);
  }
}

// 현제 제셍 노래 정보
export async function getPlayingTrack() {
  try {
    const response = await SPOTIFY_WEB_API.getMyCurrentPlayingTrack();
    return response?.item as unknown as CurrentlyPlayingTrack;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response.status}`);
  }
}

// Top5 기반으로 추천리스트
export async function getRecommendations() {
  try {
    const myTopFive = await getTopTracks().then(v => {
      return v?.items.map(item => item.id).join(',');
    });
    const response = (await api
      .get(`recommendations?limit=5&seed_tracks=${myTopFive}`, {})
      .json()) as Recommendations;
    return response;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response?.status}`);
  }
}

/**
 * 게시물 다음 페이지 가져오기
 */
export async function getNextPage(endpoint: string) {
  try {
    const getResponse = await api.get(`${endpoint}`, {}).json();
    return getResponse;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response.status}`);
  }
}

/**
 * 아티스트 정보 가져오기
 */
export async function getArtists(artists: string[]) {
  try {
    const removedDuplicateArists = [...new Set(artists)];
    const response = await SPOTIFY_WEB_API.getArtists(removedDuplicateArists);
    return response as unknown as Artist[];
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response.status}`);
  }
}

/**
 * 아티스트 정보 가져오기
 */
export async function searchKeyword(searchWord: string) {
  try {
    const response = await SPOTIFY_WEB_API.search(searchWord, [
      'album',
      'artist',
      'playlist',
      'track',
    ]);
    return response as unknown as SearchResult;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response.status}`);
  }
}
