import classNames from 'classnames/bind';

import PauseButton from '@/components/_shared/Button/PlayPauseButton/PauseButton';
import PlayButton from '@/components/_shared/Button/PlayPauseButton/PlayButton';
import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import { TrackSearchResult } from '@/models/Spotify';
import Style from './table.module.scss';

const style = classNames.bind(Style);

export default function Table({
  items,
}: Readonly<{
  items: TrackSearchResult['items'];
}>) {
  const { data } = useCurrentPlayingTrack();
  return (
    <ul className={style('table')}>
      {items.map(item => (
        <li className={style('table-item')} key={item.id}>
          <li>
            <img
              src={
                item?.album?.images == null
                  ? PLACEHOLDER_IMAGE
                  : item?.album?.images[0]?.url
              }
              alt={`${item?.album.name} 앨범 커버 이미지`}
            />
          </li>

          <li className={style('table-item-description')}>
            <div className={style('top-track-name')}>
              {item?.name}{' '}
              {data?.is_playing && data?.item?.id === item?.id ? (
                <PauseButton />
              ) : (
                <PlayButton
                  context={item.album.uri}
                  uri={item.uri}
                  position_ms={0}
                />
              )}
            </div>
          </li>
        </li>
      ))}
    </ul>
  );
}
