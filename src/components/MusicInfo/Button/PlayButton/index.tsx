import { playTrack } from '@/api/spotify';
import PlayIcon from '@/assets/playIcon.svg';
import { useDebounce } from '@/hooks/useDebounce';
import { MetaInfo } from '@/models/MetaInfo';
import { CurrentlyPlayingTrack } from '@/models/track';
import classNames from 'classnames';
import { HtmlHTMLAttributes } from 'react';
import '../button.scss';

export interface PlayButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  imgUrl?: string;
  context: MetaInfo['uri'];
  uri?: CurrentlyPlayingTrack['item']['uri'];
  position_ms: CurrentlyPlayingTrack['progress_ms'];
}

const PlayButton = ({ context, uri, position_ms }: PlayButtonProps) => {
  const playHandler = () =>
    playTrack({
      offset: { uri },
      position_ms,
      context_uris: context,
    });

  const debouncedPlayHandler = useDebounce(() => {
    playHandler();
  });

  return (
    <button
      className={classNames('play-button', 'button')}
      onClick={debouncedPlayHandler}
    >
      <PlayIcon />
    </button>
  );
};
export default PlayButton;
