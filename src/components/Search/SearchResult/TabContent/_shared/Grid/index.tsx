import classNames from 'classnames';
import { FC, HtmlHTMLAttributes, ReactNode } from 'react';
import './grid.scss';
export interface GridProps extends HtmlHTMLAttributes<HTMLUListElement> {
  children: ReactNode;
  isSkeleton?: boolean;
}

const Grid: FC<GridProps> = ({ children, isSkeleton }) => {
  return <ul className={classNames('grid', { isSkeleton })}>{children}</ul>;
};

export default Grid;
