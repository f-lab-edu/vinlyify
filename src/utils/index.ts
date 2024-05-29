export const debounce = (fn: () => void, wait: number) => {
  let timeout = null as NodeJS.Timeout | string | number | undefined | null;

  return (...args: unknown[]) => {
    const later = () => {
      timeout = -1;
      fn(...(args as [])); // args로 넘길 타입은 뭐로 해야할까 🤔
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(later, wait);
  };
};
