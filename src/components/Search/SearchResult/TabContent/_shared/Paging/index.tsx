import { Pagination } from '@/models/Pagination';

const Paging = ({ pagingInfo }: { pagingInfo: Pagination }) => {
  return <> {JSON.stringify(pagingInfo)}</>;
};
export default Paging;
