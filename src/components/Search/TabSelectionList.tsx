import '@/style/search/tab-selection-list.scss';
import classNames from 'classnames';
import { FC, HtmlHTMLAttributes } from 'react';

const TabSelectionList: FC<HtmlHTMLAttributes<HTMLUListElement>> = ({
  children,
}) => {
  return <ul className={classNames('tabSelectionList')}>{children}</ul>;
};
export default TabSelectionList;
