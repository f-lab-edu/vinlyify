import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Playlist } from '@/models/Playlist';
import classNames from 'classnames/bind';
import Card from '../_shared/Card';
import CoverImage from '../_shared/CoverImage';

import Style from './playlist-item.module.scss';

const style = classNames.bind(Style);

const PlaylistItem = ({ item }: { item: Playlist }) => {
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

const PlaylistTab = ({ tabItem }: { tabItem: Playlist[] }) => {
  return tabItem?.map((item, index) => (
    <PlaylistItem item={item} key={item.id + index} />
  ));
};

export default PlaylistTab;
