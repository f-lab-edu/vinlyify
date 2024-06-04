import classNames from 'classnames';
import { FC, HtmlHTMLAttributes, ReactNode } from 'react';
import './album-list-wrap.scss';
export interface AlbumListWrap extends HtmlHTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

const AlbumListWrap: FC<AlbumListWrap> = ({ children }) => {
  return <ul className={classNames('album-list-wrap')}>{children}</ul>;
};

export default AlbumListWrap;
