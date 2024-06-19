import classNames from 'classnames';
import '../skeleton.scss';

const CoverImageSkeleton = () => {
  return <span className={classNames('cover-image', 'skeleton')} />;
};

export default CoverImageSkeleton;
