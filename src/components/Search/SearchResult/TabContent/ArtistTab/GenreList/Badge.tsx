import classNames from 'classnames';
import { FC, HtmlHTMLAttributes, ReactNode } from 'react';
import './badge.scss';
export interface BadgeProps extends HtmlHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
  badgeNumber: number;
}

const Badge: FC<BadgeProps> = ({ children, badgeNumber }) => {
  return (
    <li className={classNames('badge', `badge-${badgeNumber % 5}`)}>
      {children}
    </li>
  );
};

export default Badge;
