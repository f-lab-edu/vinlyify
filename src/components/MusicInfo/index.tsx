import { getPlayingTrack } from '@/api/spotify';
import { CurrentlyPlayingTrack } from '@/models/track';

import { useEffect, useState } from 'react';

export default function MusicInfo() {
  const [currentPlaying, setCurrentPlaying] =
    useState<CurrentlyPlayingTrack | null>(null);
  useEffect(() => {
    getPlayingTrack().then(v => setCurrentPlaying(v));
  }, []);
  return <>{JSON.stringify(currentPlaying)}</>;
}
