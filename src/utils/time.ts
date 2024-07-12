/**
 * 밀리초로 되어 있는 UTC 시간을 HH:MM:SS 형식으로 변환
 */
export function HHMMSSFormat({ utcTime }: { utcTime: number }) {
  const time = new Date(utcTime);
  const MMSS = [
    `${time.getUTCMinutes()}`.padStart(2, '0'),
    `${time.getUTCSeconds()}`.padStart(2, '0'),
  ];
  return time.getUTCHours() > 0
    ? [`${time.getUTCHours()}`.padStart(2, '0'), ...MMSS].join(':')
    : MMSS.join(':');
}
