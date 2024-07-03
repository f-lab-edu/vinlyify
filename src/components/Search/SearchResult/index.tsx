import TabContent from './TabContent';
import Grid from './TabContent/_shared/Grid';
import TabSelection from './TabSelection';

export default function SearchResult() {
  return (
    <>
      <TabSelection />
      <Grid>
        <TabContent />
      </Grid>
    </>
  );
}
