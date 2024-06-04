import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import TabSelectionList from './TabSelectionList';
import { DEFAULT_TAB, SCOPE, TAB } from './constants';

const TAB_ITEMS = Object.values(TAB);

export default function TabSelection() {
  const tabs = Object.values(TAB) as Array<keyof typeof TAB>;
  const [searchParams, setSearchParams] = useSearchParams();
  const otherParams = useMemo(() => {
    return [...searchParams]
      .filter(v => v[0] !== SCOPE)
      .reduce(
        (acc, curr) => {
          const [key, val] = curr;
          acc[key] = val;
          return acc;
        },
        {} as { [key: string]: string },
      );
  }, [searchParams]);

  const currentTab = useMemo(() => {
    return searchParams.has(SCOPE) &&
      TAB_ITEMS.includes(searchParams.get(SCOPE) as string)
      ? searchParams.get(SCOPE)
      : DEFAULT_TAB;
  }, [searchParams]);

  const onSelectMenuHandler = useCallback(
    (item: keyof typeof TAB) => {
      setSearchParams({
        scope: item,
        ...otherParams,
      });
    },
    [setSearchParams, otherParams],
  );

  return (
    <TabSelectionList>
      {tabs.map(tab => {
        return (
          <li
            key={tab}
            className={tab === currentTab ? 'submenu focused' : 'submenu'}
          >
            <button
              className="unstyled-button"
              onClick={() => onSelectMenuHandler(tab)}
            >
              {tab}
            </button>
          </li>
        );
      })}
    </TabSelectionList>
  );
}
