import Play from '@/assets/playIcon.svg';
import classNames from 'classnames';
import { HtmlHTMLAttributes } from 'react';
import './play-button.scss';

export interface PlayableProps extends HtmlHTMLAttributes<HTMLDivElement> {
  onPlayCurrent: () => void;
}

const PlayButton = ({ onPlayCurrent }: PlayableProps) => {
  return (
    <div className={classNames('play-button')} onClick={onPlayCurrent}>
      <Play />
    </div>
  );
};
export default PlayButton;
