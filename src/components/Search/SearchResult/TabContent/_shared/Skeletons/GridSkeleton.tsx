import CardSkeleton from '../Card/CardSkeleton';
import Grid from '../Grid';

const GridSkeleton = () => {
  return (
    <Grid isSkeleton={true}>
      {Array.from({ length: 20 }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </Grid>
  );
};

export default GridSkeleton;
