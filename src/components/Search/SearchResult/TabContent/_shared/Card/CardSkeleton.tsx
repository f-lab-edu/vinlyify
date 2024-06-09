import classNames from 'classnames';
import ProfileSkeleton from '../Skeletons/ProfileSkeleton';
import './card-skeleton.scss';

const CardSkeleton = () => {
  return (
    <li className={classNames('card-skeleton', 'card')}>
      <ProfileSkeleton />
      <ul>
        <li>
          <span className={classNames('title', 'skeleton')} />
        </li>

        <li className="wrap">
          <span className={classNames('title-tag', 'skeleton')} />
        </li>

        <li>
          <span className="content skeleton" />
        </li>
      </ul>
    </li>
  );
};

export default CardSkeleton;
