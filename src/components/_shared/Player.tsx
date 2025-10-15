import PlayButton from '@/components/_shared/Button/PlayPauseButton/PlayButton';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import { HtmlHTMLAttributes } from 'react';
import PauseButton from '../MusicInfo/_shared/Button/PauseButton';
import PlayIcon from './Icons/Play';

export interface PlayerProps extends HtmlHTMLAttributes<HTMLLIElement> {
  contextUri: string;
  id?: string;
  offset?: { uri: string } | { position: number };
  enabled?: boolean;
}

const Player = ({ offset, contextUri, id, enabled = false }: PlayerProps) => {
  const { data, isLoading } = useCurrentPlayingTrack({ enabled });
  if (isLoading) {
    return <PlayIcon />;
  }
  return data?.is_playing && data?.item?.id === id ? (
    <PauseButton />
  ) : (
    <PlayButton
      context={contextUri}
      position_ms={0}
      uri={offset == null && contextUri != null ? { uri: contextUri } : offset}
    />
  );
};

export default Player;
