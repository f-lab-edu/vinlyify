import PauseIcon from '@/components/_shared/Icons/Pause';
import { useDebounce } from '@/hooks/useDebounce';
import { pauseTrack } from '@/services/spotify/playerSevices';

const PauseButton = ({ disabled = false }: { disabled?: boolean }) => {
  const onPauseDebounceHandler = useDebounce(() => pauseTrack({}));

  return (
    <button
      className={
        'border-none hover:cursor-pointer fill-(--color-white) hover:fill-(--grey-100) p-0 w-4 mr-1'
      }
      disabled={disabled}
      onClick={onPauseDebounceHandler}
    >
      <PauseIcon />
    </button>
  );
};
export default PauseButton;
