import classNames from 'classnames/bind';

import { TrackSearchResult } from '@/models/Spotify';
import Style from './carousel.module.scss';
import CarouselItem from './CarouselItem';

const style = classNames.bind(Style);

export default function Carousel({
  items,
}: {
  items: TrackSearchResult['items'] | undefined;
}) {
  return (
    <div className={style('wrap')}>
      <div className={style('carousel-wrap')}>
        <section className={style('carousel-group-wrap')}>
          {items?.map((item, index) => (
            <CarouselItem item={item} key={item.id + index} index={index} />
          ))}
          {items?.map((item, index) => (
            <CarouselItem item={item} key={item.id + index} index={index} />
          ))}
        </section>
      </div>
    </div>
  );
}
