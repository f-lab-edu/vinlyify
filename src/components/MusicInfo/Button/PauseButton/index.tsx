import { pauseTrack } from '@/api/spotify';
import PauseIcon from '@/assets/pauseIcon.svg';
import { useDebounce } from '@/hooks/useDebounce';
import classNames from 'classnames';
import '../button.scss';

const PauseButton = () => {
  const onPauseDebounceHandler = useDebounce(() => pauseTrack({}));

  return (
    <button className={classNames('button')} onClick={onPauseDebounceHandler}>
      <PauseIcon />
    </button>
  );
};
export default PauseButton;
