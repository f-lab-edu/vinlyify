import { useDebounce } from '@/hooks/useDebounce';
import { pauseTrack } from '@/services/spotify/playerSevices';
import PauseIcon from '../../Icons/Pause';
import Button from '../Button';

const PauseButton = () => {
  const onPauseDebounceHandler = useDebounce(() => pauseTrack({}));

  return (
    <Button onClick={onPauseDebounceHandler}>
      <PauseIcon />
    </Button>
  );
};
export default PauseButton;
