import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Artist } from '@/models/Profile';
import { useMemo } from 'react';
import Card from '../_shared/Card';

import CoverImage from '../_shared/CoverImage';
import CoverImageSkeleton from '../_shared/CoverImage/CoverImageSkeleton';
import GenreList from './GenreList';

const ArtistItem = ({ item }: { item: Artist }) => {
  /**
   * 팔로워 수를 한국식으로 간략화 (ex. 5650186 => 565만)
   */
  const compactFollowerCount = useMemo(() => {
    if (item?.followers?.total) {
      return `followers : ${new Intl.NumberFormat('ko-KR', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(item?.followers.total)}`;
    }
  }, [item]);

  return (
    <Card
      title={item?.name}
      contextUri={item?.uri}
      title_tag={compactFollowerCount}
      topContent={
        item?.images ? (
          <CoverImage
            url={item?.external_urls?.spotify}
            imgUrl={
              item?.images === undefined
                ? PLACEHOLDER_IMAGE
                : item?.images[0]?.url
            }
          />
        ) : (
          <CoverImageSkeleton />
        )
      }
    >
      {item?.genres && item.genres?.length > 0 ? (
        <GenreList genres={item?.genres} />
      ) : null}
    </Card>
  );
};

export default ArtistItem;
