import classNames from 'classnames';

import { ReactNode } from 'react';
import './style.scss';

interface TabProps {
  children: ReactNode;
}

const TabHead: React.FC<TabProps> = ({ children }) => {
  return (
    <ul className={classNames('TabHead', 'submenu', 'focused')}>{children}</ul>
  );
};
export default TabHead;
