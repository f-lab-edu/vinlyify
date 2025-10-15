import Card from '@/components/_shared/Card';
import { useThrottledWindowSize } from '@/hooks/useWindowSize';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { JSX, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

// Global cache
export const imageCache = new Set<string>();

export interface VirtualGridProps {
  columnWidth?: number;
  rowCount?: number;
  columnBreakPoints?: Record<number, number>;
  defaultColumnBreakPoint?: number;
  hasNextPage: boolean;
  infiniteItems: any[];
  throttleSizeMs?: number;
  isFetchingNextPage?: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>;
  GridItem: (args: any) => JSX.Element;
  id: string;
  isFetching?: boolean;
  isLoading?: boolean;
}

const VirtualGrid = ({
  columnWidth = 300,
  defaultColumnBreakPoint = 4,
  columnBreakPoints = { 576: 1, 768: 2, 1024: 3 },
  throttleSizeMs = 30,
  GridItem,
  rowCount,
  infiniteItems = [],
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isFetching,
  isLoading,
  id,
}: VirtualGridProps) => {
  const { width } = useThrottledWindowSize(throttleSizeMs);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const columns = useMemo(() => {
    const keys = Object.keys(columnBreakPoints);
    const values = Object.values(columnBreakPoints);
    const filtered = values.filter((_, index) => width < +keys[index]);
    if (filtered.length === 0) {
      return defaultColumnBreakPoint;
    } else {
      return filtered[0];
    }
  }, [width, columnBreakPoints]);

  const virtualizer = useVirtualizer({
    count: rowCount ? rowCount + (!hasNextPage ? 1 : 0) : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 600,
    overscan: 2,
    gap: 16,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => columnWidth,
    overscan: 2,
    gap: 16,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const virtualColumns = columnVirtualizer.getVirtualItems();

  useEffect(() => {
    virtualRows.forEach(vRow => {
      const item = infiniteItems[vRow.index];
      if (item?.image) {
        const img = new Image();
        img.src = item.image;
      }
    });
  }, [virtualRows, infiniteItems]);

  const restoredRef = useRef(false);

  useLayoutEffect(() => {
    if (restoredRef.current) return; // only restore once
    if (!scrollRef.current) return;
    if (!rowCount || rowCount <= 0) return;

    // wait one frame so measurements exist
    const raf = requestAnimationFrame(() => {
      restoredRef.current = true;
    });

    return () => cancelAnimationFrame(raf);
  }, [infiniteItems, rowCount, virtualizer, scrollRef, restoredRef]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || isFetching || isLoading) {
      return;
    }

    const lastRowIndex = virtualRows[virtualRows.length - 1]?.index ?? 0;
    const lastColIndex = virtualColumns[virtualColumns.length - 1]?.index ?? 0;

    // The last visible item index
    const lastVisibleIndex = lastRowIndex * columns + lastColIndex;

    const threshold = columns * 2;

    if (lastVisibleIndex + threshold >= infiniteItems.length) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    virtualRows,
    virtualColumns,
    infiniteItems.length,
    columns,
    fetchNextPage,
  ]);

  return (
    <div
      ref={scrollRef}
      className="relative h-[78%] overflow-auto"
      key={'virtual-grid-id' + id}
    >
      <div className="relative m-4 will-change-transform">
        {virtualRows.map(vRow => {
          if (!hasNextPage && vRow.index === rowCount) {
            return (
              <div
                key="end-page-row"
                ref={virtualizer.measureElement}
                className="absolute top-0 left-0 w-full text-center py-4"
                style={{
                  transform: `translateY(${vRow.start - virtualizer.options.scrollMargin}px)`,
                }}
              >
                - The End 🎧 -
              </div>
            );
          }
          return (
            <div
              key={`row-${id}-${vRow.index}`}
              data-index={vRow.index}
              ref={virtualizer.measureElement}
              className="inline-grid grid-cols-1 absolute top-0 left-0 gap-x-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full"
              style={{
                transform: `translateY(${vRow.start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              {virtualColumns.map(vCol => {
                const itemIndex = vRow.index * columns + vCol.index;
                const item = infiniteItems?.[itemIndex];

                if (!hasNextPage && item == null) {
                  return null;
                }

                if (item == null) {
                  // show skeletons only for items beyond loaded data
                  if (itemIndex >= infiniteItems.length) {
                    return (
                      <Card.Skeleton
                        key={`skeleton-${vRow.index}-${vCol.index}`}
                      />
                    );
                  }
                  return null;
                }

                return (
                  <div
                    data-index={itemIndex}
                    ref={columnVirtualizer.measureElement}
                    key={item.id}
                  >
                    <GridItem item={item} tabItem={infiniteItems} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualGrid;
