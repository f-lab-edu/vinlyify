import { api } from '@/api/spotifyInstance';
import { API } from '@/constants/url';
import { SearchResult, TrackSearchResult } from '@/models/Spotify';
import { Track } from '@/models/Track';
import splitLengthyList from '@/utils/splitLengthyList';

/**
 * top5 청취기록
 */
export function getTopTracks(limit = 5): Promise<TrackSearchResult> {
  return api.get(`me/top/tracks?time_range=short_term&limit=${limit}`).json();
}

/**
 * 현제 제셍 노래 정보 : SPOTIFY_WEB_API.getMyCurrentPlayingTrack()
 */
export function getPlayingTrack(): Promise<SpotifyApi.CurrentlyPlayingResponse> {
  return api.get('me/player/currently-playing').json();
}

/**
 * 게시물 페이지 가져오기
 */
export function getPage(endpoint: string): Promise<SearchResult> {
  return api.get(`${endpoint.replace(API.SPOTIFY, '')}`).json();
}

/* 다수 아티스트 검색 */
export async function getArtistList(artists: string[]) {
  if (artists.length > 50) {
    const results = await Promise.all(
      splitLengthyList(artists).map(list =>
        api.get(`artists?ids=${list.join(',')}`),
      ),
    );
    return results;
  } else {
    const res: SpotifyApi.MultipleArtistsResponse = await api
      .get(`artists?ids=${artists.join(',')}`)
      .json();
    return res.artists;
  }
}

export function searchKeyword(
  searchWord: string,
  signal?: AbortSignal,
): Promise<SpotifyApi.SearchResponse> {
  return api
    .get(
      `search?q=${encodeURIComponent(searchWord)}&type=album,artist,playlist,track`,
      {
        signal,
      },
    )
    .json<SpotifyApi.SearchResponse>();
}

/**
 * top1 아티스트 기반 디폴트 검색
 */
export async function searchFromMyTopOne({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<{
  keyword: string;
  response: SpotifyApi.SearchResponse;
}> {
  const topArtistName = (await getTopTracks(1)).items[0]?.artists[0]?.name;
  if (!topArtistName) {
    throw new Error('top artist name is null');
  }
  const response = await searchKeyword(`${topArtistName}`, signal);
  return { keyword: topArtistName, response };
}

/**
 * artist top tracks : 재생 중인 트랙의 아티스트의 top 10 tracks
 */
export function getArtistTopTracks({ id }: { id: string }) {
  return api.get(`artists/${id}/top-tracks`, {}).json<{ tracks: Track[] }>();
}

/**
 * artist top tracks : 재생 중인 트랙의 아티스트의 top 10 tracks
 * SPOTIFY_WEB_API.getMyTopArtists();
 */
export function getMyTopItems({
  type = 'artists',
  time_range = 'medium_term',
  limit = 20,
  offset = 0,
}: {
  type?: 'artists' | 'tracks';
  limit?: number;
  offset?: number;
  time_range?: 'long_term' | 'medium_term' | 'short_term'; //long_term (calculated from ~1 year of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks)
}): Promise<
  SpotifyApi.UsersTopArtistsResponse | SpotifyApi.UsersTopTracksResponse
> {
  return api
    .get(
      `me/top/${type}?time_range=${time_range}&limit=${limit <= 20 ? limit : 20}&offset=${offset}`,
    )
    .json();
}
