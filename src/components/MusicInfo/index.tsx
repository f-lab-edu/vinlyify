import { PLACEHOLDER_IMAGE } from '@/constants';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import { default as PauseButton } from './Button/PauseButton';
import PlayButton from './Button/PlayButton';
import ProgressBar from './ProgressBar';

import Vinyl from './Vinyl';

export default function MusicInfo() {
  const { data } = useCurrentPlayingTrack();

  return !data?.item ? (
    <>nothing to show...</>
  ) : (
    <>
      {/* <h1>
        {data.item.name}, current progress: {data?.progress_ms}
      </h1> */}
      <Vinyl
        imgUrl={
          data.item?.album?.images[0].url
            ? data.item?.album?.images[0].url
            : PLACEHOLDER_IMAGE
        }
      />
      {data?.is_playing ? (
        <PauseButton />
      ) : (
        <PlayButton
          context={data.item.album.uri}
          uri={data?.item.uri}
          position_ms={data?.progress_ms || 0}
        />
      )}

      <ProgressBar
        progress={data?.progress_ms ?? 0}
        duration={data?.item?.duration_ms}
      />
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
