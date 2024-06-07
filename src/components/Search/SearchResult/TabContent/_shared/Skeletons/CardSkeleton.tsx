import Card from '../Card';
import Logo from '../Logo';
import ProfileSkeleton from './ProfileSkeleton';

const CardSkeleton = Array.from({ length: 20 }, (_, i) => (
  <Card
    left={
      <>
        <ProfileSkeleton />
        <Logo url={''} fill="skeleton" />
      </>
    }
    isSkeleton={true}
    key={i}
  ></Card>
));

export default CardSkeleton;
