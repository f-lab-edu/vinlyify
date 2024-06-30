import { Pagination } from '@/models/Pagination';
import { Playlist } from '@/models/Playlist';
import Grid from '../_shared/Grid';
import Paging from '../_shared/Paging';
import PlaylistItem from './PlaylistItem';

const PlaylistTab = ({
  tabItem,
  currentTabPagingInfo,
}: {
  tabItem: Playlist[];
  currentTabPagingInfo: Pagination;
}) => {
  return (
    <>
      <Grid>
        {tabItem?.map(item => <PlaylistItem item={item} key={item.id} />)}
      </Grid>
      <Paging currentTabPagingInfo={currentTabPagingInfo} />
    </>
  );
};

export default PlaylistTab;
