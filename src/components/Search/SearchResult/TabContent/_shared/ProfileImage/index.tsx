import { PLACEHOLDER_IMAGE } from '@/constants';
import classNames from 'classnames';
import { ReactNode, SVGProps } from 'react';
import './profile-image.scss';
export interface ImgUrlProps extends SVGProps<SVGImageElement> {
  imgUrl?: string;
  link: ReactNode;
}

const CoverImage = ({ imgUrl, link }: ImgUrlProps) => {
  return (
    <>
      <img
        src={imgUrl == null ? PLACEHOLDER_IMAGE : imgUrl}
        alt={imgUrl}
        loading="lazy"
        className={classNames('cover-image')}
      />
      {link}
    </>
  );
};

export default CoverImage;
