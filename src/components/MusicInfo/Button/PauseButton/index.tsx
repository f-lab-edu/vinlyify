import { pauseTrack } from '@/api/spotify';
import PauseIcon from '@/assets/pauseIcon.svg';
import { useDebounce } from '@/hooks/useDebounce';
import classNames from 'classnames';
import '../button.scss';

const PauseButton = () => {
  const pauseHandler = () => pauseTrack({});

  const debouncedPauseHandler = useDebounce(() => {
    pauseHandler();
  });

  return (
    <button className={classNames('button')} onClick={debouncedPauseHandler}>
      <PauseIcon />
    </button>
  );
};
export default PauseButton;
