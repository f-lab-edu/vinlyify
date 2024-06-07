import classNames from 'classnames';
import { FC, HtmlHTMLAttributes } from 'react';
import './skeleton.scss';

const ProfileSkeleton: FC<HtmlHTMLAttributes<HTMLSpanElement>> = () => {
  return <span className={classNames('profileImage', 'skeleton')} />;
};

export default ProfileSkeleton;
