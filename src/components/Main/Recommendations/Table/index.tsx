import classNames from 'classnames/bind';

import PauseButton from '@/components/_shared/Button/PauseButton';
import PlayButton from '@/components/_shared/Button/PlayButton';
import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import { TrackSearchResult } from '@/models/Spotify';
import { HHMMSSFormat } from '@/utils/time';
import { Link } from 'react-router-dom';
import Style from './table.module.scss';

const style = classNames.bind(Style);

const Table = ({
  items,
}: Readonly<{
  items: TrackSearchResult['items'];
}>) => {
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
            <div className={style('top-track-name')}>{item?.name} </div>
            <div>
              {item?.artists.map((artist, index) => (
                <>
                  <Link
                    to={artist.external_urls?.spotify ?? '#'}
                    className={style('artist-name', 'description', 'link')}
                  >
                    {artist.name}
                  </Link>
                  {index <= item?.artists.length - 2 ? ', ' : null}
                </>
              ))}
            </div>

            <div className={style('bottom-content')}>
              {data?.is_playing && data?.item?.id === item?.id ? (
                <PauseButton />
              ) : (
                <PlayButton
                  context={item.album.uri}
                  uri={item.uri}
                  position_ms={0}
                />
              )}
              <div className={style('description')}>
                {HHMMSSFormat({ utcTime: item.duration_ms })}
              </div>
            </div>
          </li>
        </li>
      ))}
    </ul>
  );
};

const TableSkeleton = () => {
  return (
    <ul className={style('table')}>
      {Array.from({ length: 20 }).map((_, index) => (
        <li className={style('table-item')} key={`skeleton-${index + 1}`}>
          <li className={style('skeleton-image', 'skeleton')}></li>

          <li className={style('table-item-description')}>
            <span className={style('skeleton', 'track-name')}></span>
            <span className={style('skeleton', 'artist-name-skeleton')} />
            <div className={style('bottom-content')}>
              <PlayButton context="" position_ms={0} aria-disabled={true} />
              <span className={style('skeleton', 'description-skeleton')} />
            </div>
          </li>
        </li>
      ))}
    </ul>
  );
};

Table.Skeleton = TableSkeleton;

export default Table;
