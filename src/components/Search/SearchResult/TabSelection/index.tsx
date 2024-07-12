import classNames from 'classnames/bind';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_TAB, SCOPE, TAB } from '../../constants';
import Style from './tab-selection-list.module.scss';

const style = classNames.bind(Style);

const TAB_ITEMS = Object.values(TAB);

export default function TabSelection() {
  const tabs = Object.values(TAB) as Array<keyof typeof TAB>;
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = useMemo(() => {
    return searchParams.has(SCOPE) &&
      TAB_ITEMS.includes(searchParams.get(SCOPE) as string)
      ? searchParams.get(SCOPE)
      : DEFAULT_TAB;
  }, [searchParams]);

  const handleSelectMenu = useCallback(
    (item: keyof typeof TAB) => {
      const searchParamKeyValuePair = [...searchParams].reduce(
        (acc, curr) => {
          const [key, val] = curr;
          acc[key] = val;
          return acc;
        },
        {} as { [key: string]: string },
      );
      setSearchParams({
        ...searchParamKeyValuePair,
        scope: item,
      });
    },
    [setSearchParams, searchParams],
  );

  return (
    <ul className={style('tab-selection-list')}>
      {tabs.map(tab => {
        return (
          <li
            key={tab}
            className={style({ submenu: true, focused: tab === currentTab })}
          >
            <button
              className={style('unstyled-button')}
              onClick={() => handleSelectMenu(tab)}
            >
              {tab}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
