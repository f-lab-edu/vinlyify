import { Loading } from '@/components/Main';
import { Playlist } from '@/models/Playlist';
import Grid from '../_shared/Grid';
import PlaylistInfo from './PlaylistInfo';

const PlaylistsTab = ({ tabItem }: { tabItem: Playlist[] }) => {
  if (tabItem?.length === 0) return <Loading />;
  return (
    <Grid>
      {tabItem?.map(item => <PlaylistInfo item={item} key={item.id} />)}
    </Grid>
  );
};

export default PlaylistsTab;
