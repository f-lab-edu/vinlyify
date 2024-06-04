import Play from '@/assets/playIcon.svg';
import classNames from 'classnames';
import { FC, HtmlHTMLAttributes } from 'react';
import './play-button.scss';

export interface PlayableProps extends HtmlHTMLAttributes<HTMLDivElement> {
  onPlayCurrent: () => void;
}

const PlayButton: FC<PlayableProps> = ({ onPlayCurrent }) => {
  return (
    <div className={classNames('play')} onClick={onPlayCurrent}>
      <Play />
    </div>
  );
};
export default PlayButton;
