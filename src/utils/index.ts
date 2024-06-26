/**
 * 참고 : https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
 * */
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number = 1_000,
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}
