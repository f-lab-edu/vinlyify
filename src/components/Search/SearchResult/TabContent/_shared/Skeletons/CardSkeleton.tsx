import Card from '../Card';
import Logo from '../Logo';
import ProfileSkeleton from './ProfileSkeleton';

const CardSkeleton = () => {
  return (
    <Card
      left={
        <>
          <ProfileSkeleton />
          <Logo url={''} fill="skeleton" />
        </>
      }
      isSkeleton={true}
    ></Card>
  );
};

export default CardSkeleton;
