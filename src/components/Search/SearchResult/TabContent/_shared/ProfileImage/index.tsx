import { PLACEHOLDER_IMAGE } from '@/constants';
import classNames from 'classnames';
import { FC, ReactNode, SVGProps } from 'react';
import './profile-image.scss';
export interface ImgUrlProps extends SVGProps<SVGImageElement> {
  imgUrl?: string;
  round?: boolean;
  link: ReactNode;
}

const ProfileImage: FC<ImgUrlProps> = ({ imgUrl, round, link }) => {
  return (
    <>
      <img
        src={imgUrl === undefined ? PLACEHOLDER_IMAGE : imgUrl}
        alt={imgUrl}
        loading="lazy"
        className={classNames('profileImage', { round })}
      />
      {link}
    </>
  );
};

export default ProfileImage;
