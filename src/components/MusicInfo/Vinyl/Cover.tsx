import '@/style/music-info/cover.scss';
import classNames from 'classnames';
import { FC, SVGProps } from 'react';

export interface ImgUrlProps extends SVGProps<SVGImageElement> {
  imgUrl?: string;
}

const Cover: FC<ImgUrlProps> = ({ imgUrl }) => {
  return (
    <img src={imgUrl} alt={imgUrl} className={classNames('cover', imgUrl)} />
  );
};
export default Cover;
