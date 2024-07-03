import { Artist } from '@/models/Profile';
import { TabProps } from '..';
import ArtistItem from './ArtistItem';

interface ArtistListProps extends TabProps {
  tabItem: Artist[];
}

const ArtistList = ({ tabItem, innerRef }: ArtistListProps) => {
  return tabItem.map((item, index) =>
    index === tabItem.length - 1 ? (
      <ArtistItem item={item} key={item.id} innerRef={innerRef} />
    ) : (
      <ArtistItem item={item} key={item.id} />
    ),
  );
};

export default ArtistList;
