import Grid from '../Grid';
import CardSkeleton from './CardSkeleton';

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
