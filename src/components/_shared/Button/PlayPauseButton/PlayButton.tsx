import { useDebounce } from '@/hooks/useDebounce';
import { MetaInfo } from '@/models/MetaInfo';
import { CurrentlyPlayingTrack } from '@/models/Track';
import { playTrack } from '@/services/spotify/playerSevices';
import { HtmlHTMLAttributes } from 'react';
import PlayIcon from '../../Icons/Play';
import Button from '../Button';

export interface PlayButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  context: MetaInfo['uri'];
  uri?: { position: number } | { uri: string };
  position_ms?: CurrentlyPlayingTrack['progress_ms'];
}

const PlayButton = ({ context, uri, position_ms = 0 }: PlayButtonProps) => {
  const onPlayDebounceHandler = useDebounce(
    () => {
      playTrack({
        offset: uri,
        position_ms,
        context_uris: context,
      });
    },
    [],
    3_000,
  );

  return (
    <Button onClick={onPlayDebounceHandler}>
      <PlayIcon />
    </Button>
  );
};
export default PlayButton;
