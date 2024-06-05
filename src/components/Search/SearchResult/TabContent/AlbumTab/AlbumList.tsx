import { Album } from '@/models/Album';
import Grid from '../_shared/Grid';
import AlbumItem from './AlbumItem';

const AlbumList = ({
  tabItem,
  artistImgUrls,
}: {
  tabItem: Album[];
  artistImgUrls: Map<string, string>;
}) => {
  return (
    <Grid>
      {tabItem?.map(item => (
        <AlbumItem item={item} key={item.id} artistImgUrls={artistImgUrls} />
      ))}
    </Grid>
  );
};

export default AlbumList;
