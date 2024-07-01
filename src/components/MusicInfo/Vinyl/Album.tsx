import '@/style/music-info/album.scss';
import classNames from 'classnames';
import { FC, HtmlHTMLAttributes } from 'react';

const Album: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return <div className={classNames('album')}>{children}</div>;
};
export default Album;
