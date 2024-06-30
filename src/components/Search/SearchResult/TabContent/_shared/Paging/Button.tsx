import classNames from 'classnames/bind';

import useCurrentPage from '@/hooks/searchParams/useCurrentPage';
import Style from './button.module.scss';

const style = classNames.bind(Style);

const Button = ({ page, index }: { page: string; index: number }) => {
  const { currentPage, handlePageChange } = useCurrentPage();

  return (
    <button
      key={page}
      onClick={() => handlePageChange(`${index + 1}`)}
      className={style('button', {
        active:
          currentPage == null
            ? index + 1 === 1
            : Number(currentPage) == index + 1,
      })}
    >
      {index + 1}
    </button>
  );
};
export default Button;
