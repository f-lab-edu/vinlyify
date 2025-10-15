import { playTrack } from '@/services/spotify/spotify';

import PlayIcon from '@/components/_shared/Icons/Play';
import { useDebounce } from '@/hooks/useDebounce';
import { MetaInfo } from '@/models/MetaInfo';
import { CurrentlyPlayingTrack } from '@/models/Track';
import classNames from 'classnames';
import { HtmlHTMLAttributes } from 'react';

export interface PlayButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  imgUrl?: string;
  context: MetaInfo['uri'];
  uri?: CurrentlyPlayingTrack['item']['uri'];
  position_ms: CurrentlyPlayingTrack['progress_ms'];
}

const PlayButton = ({ context, uri, position_ms }: PlayButtonProps) => {
  const onPlayDebounceHandler = useDebounce(() => {
    playTrack({
      offset: { uri },
      position_ms,
      context_uris: context,
    });
  });

  return (
    <button
      className={classNames(
        'border-none hover:cursor-pointer hover:fill-(--grey-100) p-0 w-4 mr-1',
      )}
      onClick={onPlayDebounceHandler}
    >
      <PlayIcon />
    </button>
  );
};
export default PlayButton;
