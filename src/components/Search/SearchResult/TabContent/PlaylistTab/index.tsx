import { Pagination } from '@/models/Pagination';
import { Playlist } from '@/models/Playlist';
import Grid from '../_shared/Grid';
import PlaylistItem from './PlaylistItem';

const PlaylistTab = ({
  tabItem,
  currentTabPagingInfo,
}: {
  tabItem: Playlist[];
  currentTabPagingInfo: Pagination | null;
}) => {
  return (
    <Grid>
      {tabItem?.map(item => <PlaylistItem item={item} key={item.id} />)}
    </Grid>
  );
};

export default PlaylistTab;
