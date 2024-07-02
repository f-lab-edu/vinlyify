import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import classNames from 'classnames/bind';
import ArtistInfo from './ArtistInfo';
import { default as PauseButton } from './Button/PauseButton';
import PlayButton from './Button/PlayButton';
import Lyrics from './Lyrics';
import ProgressBar from './ProgressBar';
import Style from './music-info.module.scss';

import AnimatedTitle from '../_shared/AnimatedTitle';
import Vinyl from './Vinyl/Vinyl';

const style = classNames.bind(Style);

export default function MusicInfo() {
  const { data } = useCurrentPlayingTrack();

  return !data?.item ? (
    <>nothing to show...</>
  ) : (
    <div className={style('wrap')}>
      <AnimatedTitle>{data.item.name}</AnimatedTitle>
      <Vinyl
        imgUrl={
          data.item?.album?.images[0].url
            ? data.item?.album?.images[0].url
            : PLACEHOLDER_IMAGE
        }
      />
      <div className={style('music-player-wrap')}>
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
      </div>
      <AnimatedTitle>Artists</AnimatedTitle>
      <ArtistInfo artists={data.item.artists} />
      <AnimatedTitle>Lyrics</AnimatedTitle>
      <Lyrics term={data?.item?.name} artist={data?.item?.artists[0].name} />
    </div>
  );
}
