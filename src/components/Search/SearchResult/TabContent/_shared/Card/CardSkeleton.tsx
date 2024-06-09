import classNames from 'classnames';
// import CoverImageSkeleton from '../CoverImage/CoverImageSkeleton';
import './card-skeleton.scss';

const CardSkeleton = () => {
  return (
    <li className={classNames('card-skeleton', 'card')}>
      {/* <CoverImageSkeleton /> 추가하기*/}
      <ul>
        <li>
          <span className={classNames('title', 'skeleton')} />
        </li>

        <li className="wrap">
          <span className={classNames('title-tag', 'skeleton')} />
        </li>

        <li>
          <span className={classNames('content', 'skeleton')} />
        </li>
      </ul>
    </li>
  );
};

export default CardSkeleton;
