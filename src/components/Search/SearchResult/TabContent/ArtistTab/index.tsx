import { Pagination } from '@/models/Pagination';
import { Artist } from '@/models/Profile';
import Grid from '../_shared/Grid';
import Paging from '../_shared/Paging';
import ArtistItem from './ArtistItem';

const ArtistTab = ({
  tabItem,
  currentTabPagingInfo,
}: {
  tabItem: Artist[];
  currentTabPagingInfo: Pagination;
}) => {
  if (tabItem == null) return null;
  return (
    <>
      <Grid>
        {tabItem.map(item => (
          <ArtistItem item={item} key={item.id} />
        ))}
      </Grid>
      <Paging currentTabPagingInfo={currentTabPagingInfo} />
    </>
  );
};

export default ArtistTab;
