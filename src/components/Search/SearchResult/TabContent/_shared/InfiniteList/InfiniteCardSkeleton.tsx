import Card from '../Card';

const InfiniteCardSkeleton = Array.from({ length: 10 }).map((_, index) => (
  <Card.Skeleton key={`skeleton-card-${index}`} />
));
export default InfiniteCardSkeleton;
