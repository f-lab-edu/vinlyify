import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Playlist } from '@/models/Playlist';
import classNames from 'classnames/bind';
import Card from '../_shared/Card';
import CoverImage from '../_shared/CoverImage';
import CoverImageSkeleton from '../_shared/CoverImage/CoverImageSkeleton';
import useParsedDescription from './hooks/useParsedDescription';
import Style from './playlist-item.module.scss';

const style = classNames.bind(Style);

const PlaylistItem = ({ item }: { item: Playlist }) => {
  const parsedDescription = useParsedDescription(item);
  return (
    <Card
      title={item?.name}
      title_tag={`by. ${item?.owner?.display_name}`}
      topContent={
        item?.images ? (
          <CoverImage
            imgUrl={
              item?.images === undefined
                ? PLACEHOLDER_IMAGE
                : item?.images[0]?.url
            }
            url={item?.external_urls?.spotify}
          />
        ) : (
          <CoverImageSkeleton />
        )
      }
      contextUri={item?.uri}
      isPlayable={true}
    >
      <li>total tracks : {item?.tracks?.total}</li>

      <li className={style('playlist-description')}>{parsedDescription}</li>
    </Card>
  );
};

export default PlaylistItem;
