import classNames from 'classnames';
import { FC, HtmlHTMLAttributes } from 'react';
import './tab-selection-list.scss';

const TabSelectionList: FC<HtmlHTMLAttributes<HTMLUListElement>> = ({
  children,
}) => {
  return <ul className={classNames('tabSelectionList')}>{children}</ul>;
};
export default TabSelectionList;
