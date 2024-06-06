import { Loading } from '@/components/Main';
import { Playlist } from '@/models/Playlist';
import Grid from '../_shared/Grid';
import PlaylistItem from './PlaylistItem';

const PlaylistsTab = ({ tabItem }: { tabItem: Playlist[] }) => {
  if (tabItem?.length === 0) return <Loading />;
  return (
    <Grid>
      {tabItem?.map(item => <PlaylistItem item={item} key={item.id} />)}
    </Grid>
  );
};

export default PlaylistsTab;
