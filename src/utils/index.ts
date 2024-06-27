import { Track } from '@/models/track';

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

/**
 * 밀리초로 되어 있는 UTC 시간을 HH:MM:SS 형식으로 변환
 */
export function UTC2HHMMSS({
  duration_ms,
}: {
  duration_ms: Track['duration_ms'];
}) {
  const time = new Date(duration_ms);
  const MMSS = [
    `${time.getUTCMinutes()}`.padStart(2, '0'),
    `${time.getUTCSeconds()}`.padStart(2, '0'),
  ];
  return time.getUTCHours() > 0
    ? [`${time.getUTCHours()}`.padStart(2, '0'), ...MMSS].join(':')
    : MMSS.join(':');
}
