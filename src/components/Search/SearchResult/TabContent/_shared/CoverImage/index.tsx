import { PLACEHOLDER_IMAGE } from '@/constants';
import classNames from 'classnames/bind';
import { SVGProps } from 'react';
import Logo from '../Logo';
import Style from './cover-image.module.scss';
export interface ImgUrlProps extends SVGProps<SVGImageElement> {
  imgUrl?: string;
  url?: string;
}

const style = classNames.bind(Style);

const CoverImage = ({ imgUrl, url }: ImgUrlProps) => {
  return (
    <>
      <img
        src={imgUrl ?? PLACEHOLDER_IMAGE}
        alt={imgUrl}
        loading="lazy"
        className={style('cover-image')}
      />
      <Logo
        url={url ?? '#'}
        className={style({ 'logo-skeleton': url == null ? 'skeleton' : '' })}
      />
    </>
  );
};

export default CoverImage;
