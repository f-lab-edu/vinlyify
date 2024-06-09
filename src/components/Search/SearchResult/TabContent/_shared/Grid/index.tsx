import classNames from 'classnames';
import { FC, HtmlHTMLAttributes, ReactNode } from 'react';
import './grid.scss';
export interface GridProps extends HtmlHTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

const Grid: FC<GridProps> = ({ children }) => {
  return <ul className={classNames('grid')}>{children}</ul>;
};

export default Grid;
