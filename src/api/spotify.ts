import {
  API,
  DEFAULT_PLAY_TRACK,
  SPOTIFY_WEB_API,
  VINYLIFY_TOKEN,
} from '@/constants';
import { Artist } from '@/models/Profile';

import { SearchResult, TrackSearchResult } from '@/models/Spotify';

import ky, { HTTPError } from 'ky';

const api = ky.extend({
  prefixUrl: API.SPOTIFY,
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
          SPOTIFY_WEB_API.setAccessToken(null);
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

export function getActiveDevice() {
  return SPOTIFY_WEB_API.getMyDevices().then(
    res =>
      res.devices.filter(device => {
        return device.is_active;
      })[0]?.id,
  );
}

/**
 * top5 청취기록
 */
export async function getTopTracks(limit = 5) {
  return api
    .get(`me/top/tracks?time_range=short_term&limit=${limit}`, {})
    .json() as unknown as TrackSearchResult;
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
  return api
    .put(
      `me/player/play?device_id=${active_device ?? (await getActiveDevice())}`,
      {
        json: {
          context_uri: context_uris,
          offset,
          position_ms: 0,
        },
      },
    )
    .json();
}

/**
 * 현제 제셍 노래 정보
 */
export function getPlayingTrack() {
  return SPOTIFY_WEB_API.getMyCurrentPlayingTrack();
}

// Top5 기반으로 추천리스트
export async function getRecommendations() {
  try {
    const topFiveIds = (await getTopTracks()).items
      .map(item => item.id)
      .join(',');
    const response = await api
      .get(`recommendations?limit=5&seed_tracks=${topFiveIds}`, {})
      .json();
    return response;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response?.status}`);
  }
}

/**
 * 게시물 페이지 가져오기
 */
export async function getPage(endpoint: string) {
  return api
    .get(`${endpoint.replace(API.SPOTIFY, '')}`, {})
    .json() as unknown as SearchResult;
}

/**
 * 아티스트 정보 가져오기
 */
export async function getArtists(artists: string[]) {
  try {
    const removedDuplicateArists = [...new Set(artists)];
    const response = await SPOTIFY_WEB_API.getArtists(removedDuplicateArists);
    if ('artists' in response) return response.artists as unknown as Artist[];
    else throw new Error('something went wrong...');
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response.status}`);
  }
}

/**
 * 아티스트 정보 가져오기
 */
export function searchKeyword(searchWord: string | null) {
  if (!searchWord) throw new Error(`no searchword provided`);
  const response = SPOTIFY_WEB_API.search(searchWord, [
    'album',
    'artist',
    'playlist',
    'track',
  ]);
  return response as unknown as Promise<SearchResult>;
}

/**
 * top1 아티스트 기반 디폴트 검색
 */
export async function searchFromMyTopOne() {
  try {
    const topArtistName = (await getTopTracks(1)).items[0]?.artists[0]?.name;
    if (!topArtistName) throw new Error('something went wrong...');
    const response = searchKeyword(`${topArtistName}`);
    return { keyword: topArtistName, response } as unknown as {
      keyword: string;
      response: SearchResult;
    };
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response.status}`);
  }
}
