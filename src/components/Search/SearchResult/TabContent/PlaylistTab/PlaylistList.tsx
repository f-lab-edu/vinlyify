import { Playlist } from '@/models/Playlist';
import { TabProps } from '..';
import PlaylistItem from './PlaylistItem';

interface PlaylistListProps extends TabProps {
  tabItem: Playlist[];
}

const PlaylistList = ({ tabItem, innerRef }: PlaylistListProps) => {
  return tabItem.map((item, index) =>
    index === tabItem.length - 1 ? (
      <PlaylistItem item={item} key={item.id} innerRef={innerRef} />
    ) : (
      <PlaylistItem item={item} key={item.id} />
    ),
  );
};

export default PlaylistList;
