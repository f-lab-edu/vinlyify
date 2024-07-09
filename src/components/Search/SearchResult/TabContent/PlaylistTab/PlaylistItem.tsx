import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Playlist } from '@/models/Playlist';
import classNames from 'classnames/bind';
import Card from '../_shared/Card';
import CoverImage from '../_shared/CoverImage';

import { TabProps } from '..';
import Style from './playlist-item.module.scss';

const style = classNames.bind(Style);

interface PlaylistItemProps extends TabProps {
  item: Playlist;
}

const PlaylistItem = ({ item, innerRef }: PlaylistItemProps) => {
  return (
    <Card
      title={item?.name}
      innerRef={innerRef}
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
          <CoverImage.Skeleton />
        )
      }
      contextUri={item?.uri}
      isPlayable={true}
    >
      <li>total tracks : {item?.tracks?.total}</li>

      <li className={style('playlist-description')}>
        <div dangerouslySetInnerHTML={{ __html: item?.description }} />
      </li>
    </Card>
  );
};

export default PlaylistItem;
