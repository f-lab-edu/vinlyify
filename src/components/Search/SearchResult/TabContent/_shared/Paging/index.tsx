import classNames from 'classnames/bind';

import { Pagination } from '@/models/Pagination';
import Button from './Button';
import Style from './paging.module.scss';

const style = classNames.bind(Style);

const Paging = ({
  currentTabPagingInfo,
}: {
  currentTabPagingInfo: Pagination;
}) => {
  const pageList = Array.from(
    {
      length: Math.ceil(
        currentTabPagingInfo.total / currentTabPagingInfo.limit,
      ),
    },
    (_, i) =>
      currentTabPagingInfo.href.replace(
        /&offset=[0-9]{1,}/,
        `&offset=${i * currentTabPagingInfo.limit}`,
      ),
  );

  return (
    <div className={style('paging')}>
      <div className={style('paging-wrap')}>
        {pageList.map((page, index) => (
          <Button
            page={page}
            index={index}
            key={page}
            totalPageLength={pageList.length}
          />
        ))}
      </div>
    </div>
  );
};
export default Paging;
