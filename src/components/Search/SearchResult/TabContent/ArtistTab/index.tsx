import { Artist } from '@/models/Profile';
import Grid from '../_shared/Grid';
import ArtistItem from './ArtistItem';

const ArtistTab = ({ tabItem }: { tabItem: Artist[] }) => {
  if (tabItem == null) return null;
  return (
    <Grid>
      {tabItem.map(item => (
        <ArtistItem item={item} key={item.id} />
      ))}
    </Grid>
  );
};

export default ArtistTab;
