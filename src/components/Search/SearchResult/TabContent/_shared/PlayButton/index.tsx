import { playTrack } from '@/api/spotify';
import PlayIcon from '@/assets/playIcon.svg';
import { MetaInfo } from '@/models/MetaInfo';
import classNames from 'classnames';
import { HtmlHTMLAttributes } from 'react';
import './play-button.scss';

export interface PlayableProps extends HtmlHTMLAttributes<HTMLDivElement> {
  context_uris: MetaInfo['uri'];
}

const PlayButton = ({ context_uris }: PlayableProps) => {
  const handlePlayCurrent = () => {
    playTrack({ context_uris });
  };
  return (
    <button className={classNames('play-button')} onClick={handlePlayCurrent}>
      <PlayIcon />
    </button>
  );
};
export default PlayButton;
