import classNames from 'classnames';

import { ReactNode } from 'react';
import './style.scss';

interface TabListItemProps {
  children: ReactNode;
  focused: 'submenu focused' | 'submenu';
  onClick: () => void;
}

const TabListItem: React.FC<TabListItemProps> = ({
  children,
  focused,
  onClick,
}) => {
  return (
    <li className={classNames('TabListItem', focused)} onClick={onClick}>
      {children}
    </li>
  );
};
export default TabListItem;
