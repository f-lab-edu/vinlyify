import { Album } from '@/models/Album';
import { TabProps } from '..';
import { useMultiProfileMap } from '../_shared/MutliProfile/hooks/useMultiProfileMap';
import AlbumItem from './AlbumItem';

interface AlbumListProps extends TabProps {
  tabItem: Album[];
}

const AlbumList = ({ tabItem, innerRef }: AlbumListProps) => {
  const artistImgs = useMultiProfileMap({ tabItem });
  return tabItem?.map((item, index) =>
    index === tabItem.length - 1 ? (
      <AlbumItem
        item={item}
        key={item.id}
        artistImgUrls={artistImgs}
        innerRef={innerRef}
      />
    ) : (
      <AlbumItem item={item} key={item.id} artistImgUrls={artistImgs} />
    ),
  );
};

export default AlbumList;
