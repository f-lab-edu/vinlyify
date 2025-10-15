// import { debounce } from '@/utils';
// import { RefObject, useEffect, useMemo, useRef } from 'react';

// /** 짧은 시간 내에 특정 이벤트가 여러번 발생 방지 (연속된 입력 방지, 버튼 중복 클릭 방지) */
// export const useDebounce = (callback: () => void) => {
//   const ref: RefObject<typeof callback | null> = useRef(null);

//   useEffect(() => {
//     ref.current = callback;
//   }, [callback]);

//   const debouncedCallback = useMemo(() => {
//     const func = () => {
//       ref.current?.();
//     };
//     return debounce(func);
//   }, []);

//   return debouncedCallback;
// };

// or your debounce implementation
import { debounce } from '@/utils';
import { RefObject, useEffect, useMemo, useRef } from 'react';

/**
 * Prevents multiple calls in a short time (e.g. repeated input, button spam)
 */
export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  deps: any[] = [],
  delay = 300,
): T => {
  const ref: RefObject<T | null> = useRef(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback, ...deps]); // ✅ callback + deps tracked

  const debouncedCallback = useMemo(() => {
    const func = (...args: any[]) => {
      ref.current?.(...args);
    };
    return debounce(func, delay);
  }, [delay]); // ✅ still re-creates only if delay changes

  return debouncedCallback as T;
};
