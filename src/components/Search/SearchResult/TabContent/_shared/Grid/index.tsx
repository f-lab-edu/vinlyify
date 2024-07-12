import classNames from 'classnames';
import { ReactNode } from 'react';
import Card from '../Card';
import './grid.scss';

const Grid = ({ children }: { children: ReactNode }) => {
  return <ul className={classNames('grid')}>{children}</ul>;
};

const GridSkeleton = () => (
  <Grid>
    {Array.from({ length: 20 }, (_, index) => (
      <Card.Skeleton key={index} />
    ))}
  </Grid>
);

Grid.Skeleton = GridSkeleton;

export default Grid;
