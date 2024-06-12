import { pauseTrack } from '@/api/spotify';
import PauseIcon from '@/assets/pauseIcon.svg';
import classNames from 'classnames';
import '../button.scss';

const PauseButton = () => {
  const onPauseHandler = () => pauseTrack({});

  return (
    <button className={classNames('button')} onClick={onPauseHandler}>
      <PauseIcon />
    </button>
  );
};
export default PauseButton;
