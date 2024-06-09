import classNames from 'classnames';
import { FC, HtmlHTMLAttributes, PropsWithChildren } from 'react';
import './grid.scss';

const Grid: FC<HtmlHTMLAttributes<PropsWithChildren>> = ({ children }) => {
  return <ul className={classNames('grid')}>{children}</ul>;
};

export default Grid;
