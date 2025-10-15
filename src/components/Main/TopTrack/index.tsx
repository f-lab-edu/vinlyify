import { useTopTracks } from '@/hooks/query/useTopTracks';

import AnimatedTitle from '@/components/_shared/AnimatedTitle';
import Carousel from '@/components/_shared/Carousel';
import CoverImage from '@/components/_shared/CoverImage';
import PlayIcon from '@/components/_shared/Icons/Play';
import TopTrackCard from './TopTrackCard';

export default function TopTrack() {
  const { data, isLoading } = useTopTracks(20);

  return (
    <>
      <AnimatedTitle>My top 20</AnimatedTitle>
      <Carousel>
        {isLoading ? (
          <>
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i + '-skeleton'}
                className="text-(length:--text-fluid-s) flex-col inline-flex w-full align-middle gap-2"
              >
                <div className="w-44">
                  <CoverImage.Skeleton />
                </div>
                <div className="inline-flex align-middle gap-2 w-full">
                  <PlayIcon />
                  <span className="animate-pulse w-full inline-block h-(length:--text-fluid-s) bg-(--grey-600)" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {data?.items.map((item, index) => (
              <TopTrackCard key={item.id} item={item} index={index} />
            ))}
          </>
        )}
      </Carousel>
    </>
  );
}
