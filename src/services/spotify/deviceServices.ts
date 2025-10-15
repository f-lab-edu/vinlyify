import { api } from '@/api/spotifyInstance';

// SPOTIFY_WEB_API.getMyDevices()
export function getMyDevices(): Promise<SpotifyApi.UserDevicesResponse> {
  return api.get(`me/player/devices`).json();
}

/**
 *  활성화된 기기 ID 찾기
 */
export function getActiveDevice(): Promise<string | null> {
  return getMyDevices().then(
    res =>
      res.devices.filter(device => {
        return device.is_active;
      })[0]?.id,
  );
}
