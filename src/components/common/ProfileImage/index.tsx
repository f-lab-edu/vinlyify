import classNames from 'classnames';

import { FC } from 'react';
import './style.scss';

interface ProfileImageProps {
  size: 'large' | 'medium' | 'small';
  src: string | undefined;
  round: boolean;
}

const ProfileImage: FC<ProfileImageProps> = ({
  src = '',
  size = 'medium',
  round = '0',
}) => {
  return (
    <img
      alt={'no image'}
      className={classNames('ProfileImage', size, { round })}
      src={src}
    />
  );
};
export default ProfileImage;
