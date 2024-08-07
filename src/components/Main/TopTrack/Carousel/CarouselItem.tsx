import classNames from 'classnames/bind';

import CoverImage from '@/components/Search/SearchResult/TabContent/_shared/CoverImage';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import { TrackSearchResult } from '@/models/Spotify';

import PauseButton from '@/components/_shared/Button/PauseButton';
import PlayButton from '@/components/_shared/Button/PlayButton';
import Style from './carousel.module.scss';

const style = classNames.bind(Style);

const CarouselItem = ({
  item,
  index,
}: {
  item: TrackSearchResult['items'][0];
  index: number;
}) => {
  const { data } = useCurrentPlayingTrack();
  return (
    <div className={style('carousel-item')} key={item?.id}>
      <div key={item?.uri} className={style('top-track')}>
        <CoverImage
          imgUrl={item?.album?.images && item?.album?.images[0]?.url}
          url={item?.external_urls?.spotify}
        />
        <div className={style('top-track-name')}>
          {data?.is_playing && data?.item?.id === item?.id ? (
            <PauseButton />
          ) : (
            <PlayButton
              context={item.album.uri}
              uri={item.uri}
              position_ms={0}
            />
          )}
          {index + 1}. {item?.name}
        </div>
      </div>
    </div>
  );
};

const CarouselItemSkelton = () => {
  return (
    <div className={style('carousel-item')}>
      <div className={style('top-track')}>
        <CoverImage.Skeleton />

        <div className={style('top-track-name')}>
          <PlayButton
            aria-disabled={true}
            context={''}
            uri={''}
            position_ms={0}
          />

          <div className={style('skeleton', 'title')}></div>
        </div>
      </div>
    </div>
  );
};

CarouselItem.Skeleton = CarouselItemSkelton;

export default CarouselItem;
