import { api } from '@/api/spotifyInstance';
import { DEFAULT_PLAY_TRACK } from '@/constants';
import { getActiveDevice } from './deviceServices';

/**
 * 트랙 재생하기
 */
export async function playTrack({
  context_uris = DEFAULT_PLAY_TRACK,
  active_device,
  offset = { position: 0 },
  position_ms = 0,
}: {
  context_uris: string;
  offset?: { uri?: string; position?: number };
  active_device?: string;
  position_ms?: number;
}) {
  const id = await getActiveDevice();
  return await api
    .put(`me/player/play?device_id=${active_device ?? id}`, {
      json: {
        context_uri: context_uris,
        offset,
        position_ms,
      },
    })
    .json();
}

/**
 * 트랙 중지하기
 */
export async function pauseTrack({
  active_device,
}: {
  active_device?: string | null;
}) {
  return api
    .put(`me/player/pause`, {
      json: {
        device_id: active_device ?? (await getActiveDevice()),
      },
    })
    .json();
}
