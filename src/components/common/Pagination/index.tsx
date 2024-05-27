import { Pagination } from '@/models';
import { FC } from 'react';
import Button from '../Button';
import FlexWrap from '../FlexWrap';

interface PaginationProps extends Pagination {
  size?: string;
  pages: Pagination['href'][];

  pageHandler: (url: Pagination['next'] | Pagination['previous']) => void;
}

const Paging: FC<PaginationProps> = ({
  limit = 20,
  previous,
  total,
  next,
  //   pages,

  pageHandler,
}) => {
  return (
    <FlexWrap center="center">
      <Button
        onClick={() => {
          if (typeof previous == 'string') pageHandler(previous);
        }}
        disabled={typeof previous !== 'string'}
      >
        previous page
      </Button>
      {/* <ButtonGroup buttons={pages} onClick={e => {}} /> */}
      <Button
        onClick={() => pageHandler(next)}
        disabled={typeof next !== 'string'}
      >
        next page
      </Button>

      <div>total: {total}</div>
      <div>total pages: {Math.ceil(total / limit)}</div>
    </FlexWrap>
  );
};
export default Paging;
