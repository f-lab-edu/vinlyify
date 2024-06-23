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

import { Artist } from '@/models/Profile';

/**
 * 팔로워 수를 한국식으로 간략화 (ex. 5650186 => 565만)
 */
export default function formatCompactFollowerCount(item: Artist) {
  if (item?.followers?.total) {
    return `followers : ${new Intl.NumberFormat('ko-KR', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(item?.followers.total)}`;
  }
}
