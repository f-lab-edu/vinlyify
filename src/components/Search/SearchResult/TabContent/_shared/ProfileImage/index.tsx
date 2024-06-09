import { PLACEHOLDER_IMAGE } from '@/constants';
import classNames from 'classnames';
import { FC, ReactNode, SVGProps } from 'react';
import './profile-image.scss';
export interface ImgUrlProps extends SVGProps<SVGImageElement> {
  imgUrl?: string;
  round?: boolean;
  link: ReactNode;
}

const CoverImage: FC<ImgUrlProps> = ({ imgUrl, round, link }) => {
  return (
    <>
      <img
        src={imgUrl === undefined ? PLACEHOLDER_IMAGE : imgUrl}
        alt={imgUrl}
        loading="lazy"
        className={classNames('cover-image', { round })}
      />
      {link}
    </>
  );
};

export default CoverImage;
