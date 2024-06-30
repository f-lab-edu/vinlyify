import classNames from 'classnames/bind';

import { TrackSearchResult } from '@/models/Spotify';
import Style from './carousel.module.scss';
import CarouselItem from './CarouselItem';

const style = classNames.bind(Style);

const CAROUSEL_ITEM_COUNT = 20;

const CarouselSkeleton = () => {
  return (
    <div className={style('wrap')}>
      <div className={style('carousel-wrap')}>
        <section className={style('carousel-group-wrap')}>
          {Array.from({ length: CAROUSEL_ITEM_COUNT * 2 }).map((_, index) => (
            <CarouselItem.Skeleton
              key={`skeleton-carousel-item-${index + 1}`}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

const Carousel = ({ items }: { items: TrackSearchResult['items'] }) => {
  return (
    <div className={style('wrap')}>
      <div className={style('carousel-wrap')}>
        <section className={style('carousel-group-wrap')}>
          {[...items, ...items].map((item, index) => (
            <CarouselItem
              item={item}
              key={item.id + index}
              index={index % 20}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

Carousel.Skeleton = CarouselSkeleton;

export default Carousel;
