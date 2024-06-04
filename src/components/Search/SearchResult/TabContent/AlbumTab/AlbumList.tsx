import { Album } from '@/models/Album';
import AlbumItem from './AlbumItem';
import AlbumListWrap from './AlbumListWrap';

const AlbumList = ({
  tabItem,
  artistImgUrls,
}: {
  tabItem: Album[];
  artistImgUrls: Map<string, string>;
}) => {
  return (
    <AlbumListWrap>
      {tabItem?.map(item => (
        <AlbumItem item={item} key={item.id} artistImgUrls={artistImgUrls} />
      ))}
    </AlbumListWrap>
  );
};

export default AlbumList;
