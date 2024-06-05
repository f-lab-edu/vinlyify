import { Loading } from '@/components/Main';
import { Artist } from '@/models/Profile';
import Grid from '../_shared/Grid';
import ArtistInfo from './ArtistInfo';

const ArtistTab = ({ tabItem }: { tabItem: Artist[] }) => {
  if (tabItem?.length === 0) return <Loading />;
  return (
    <Grid>
      {tabItem?.map(item => <ArtistInfo item={item} key={item.id} />)}
    </Grid>
  );
};

export default ArtistTab;
