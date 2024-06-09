import classNames from 'classnames';
import '../skeleton.scss';

const CoverImageSkeleton = () => {
  return <span className={classNames('profileImage', 'skeleton')} />;
};

export default CoverImageSkeleton;
