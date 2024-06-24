import { Pagination } from '@/models/Pagination';
import { Artist } from '@/models/Profile';
import Grid from '../_shared/Grid';
import ArtistItem from './ArtistItem';

const ArtistTab = ({
  tabItem,
  currentTabPagingInfo,
}: {
  tabItem: Artist[];
  currentTabPagingInfo: Pagination | null;
}) => {
  return (
    <Grid>
      {tabItem.map(item => (
        <ArtistItem item={item} key={item.id} />
      ))}
    </Grid>
  );
};

export default ArtistTab;
