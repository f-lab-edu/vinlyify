import { Playlist } from '@/models/Playlist';
import classNames from 'classnames/bind';
import Card from '../_shared/Card';

import Style from './playlist-item.module.scss';

const style = classNames.bind(Style);

const PlaylistItem = ({ item }: { item: Playlist }) => {
  return (
    <Card
      title={item.name}
      titleTag={`by. ${item.owner.display_name}`}
      coverImage={item.images?.[0].url}
      contextUri={item.uri}
      externalUrls={item.external_urls?.spotify}
      isPlayable={true}
    >
      <li>total tracks : {item.tracks.total}</li>

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
