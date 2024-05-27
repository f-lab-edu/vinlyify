import classNames from 'classnames';

import { ReactNode } from 'react';
import './style.scss';

interface TabProps {
  children: ReactNode;
  size?: 'medium' | 'large' | 'small';
  color?: 'black';
}

const TabBodyWrap: React.FC<TabProps> = ({
  children,
  size = 'medium',
  color = 'black',
}) => {
  return (
    <div className={classNames('TabBodyWrap', size, color)}>{children}</div>
  );
};
export default TabBodyWrap;
