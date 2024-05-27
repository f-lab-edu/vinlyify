import classNames from 'classnames';

import { ReactNode } from 'react';
import './style.scss';

interface TabContentWrapProps {
  children: ReactNode;
}

const TabContentWrap: React.FC<TabContentWrapProps> = ({ children }) => {
  return <div className={classNames('TabContentWrap')}>{children}</div>;
};
export default TabContentWrap;
