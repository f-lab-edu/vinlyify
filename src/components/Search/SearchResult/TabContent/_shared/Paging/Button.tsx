import classNames from 'classnames/bind';

import useCurrentPage from '@/hooks/searchParams/useCurrentPage';
import { useMemo } from 'react';
import Style from './button.module.scss';

const style = classNames.bind(Style);

const Button = ({
  page,
  index,
  totalPageLength,
}: {
  page: string;
  index: number;
  totalPageLength: number;
}) => {
  const { currentPage, handlePageChange } = useCurrentPage();
  /**
   * 페이징 버튼 개수 제한 : 5
   * 처음/끝에서 두번째 버튼이 선택되어 있다면 첫/끝 5버튼 보이기
   * 나머지 버튼들은 선택된 버튼이 가운데로 오게 하며 양쪽에 2개의 버튼이 있어야 한다
   */
  const isInRange = useMemo(() => {
    // 1에서 3까지 선택되었다면 5까지 보여주기
    if (Number(currentPage) <= 3 && index < 5) return true;
    // 끝에서 2번째에서 끝이 선택되었다면 끝에서 5개 보여주기
    if (
      Number(currentPage) >= totalPageLength - 2 &&
      index >= totalPageLength - 5
    )
      return true;
    // 나머지(4에서 끝에서 2번째까지)는 선택된 버튼이 가운데로 오고 양쪽에 버튼 2개씩이 보여야 함
    return (
      index + 1 <= Number(currentPage) + 2 &&
      index + 1 >= Number(currentPage) - 2
    );
  }, [currentPage]);

  return (
    <button
      key={page}
      onClick={() => handlePageChange(`${index + 1}`)}
      className={style(
        'button',
        {
          active:
            currentPage == null
              ? index + 1 === 1
              : Number(currentPage) == index + 1,
        },
        {
          in_range: isInRange,
        },
      )}
    >
      {index + 1}
    </button>
  );
};
export default Button;
