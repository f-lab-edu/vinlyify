import { getPlayingTrack } from '@/api/spotify';
import { useEffect, useState } from 'react';

export default function MusicInfo() {
  const [currentPlaying, setCurrentPlaying] = useState<CurrentlyPlaying | null>(
    null,
  );
  useEffect(() => {
    getPlayingTrack().then(v => setCurrentPlaying(v));
  }, []);
  return <>{JSON.stringify(currentPlaying)}</>;
}
