/**
 * 팔로워 수를 한국식으로 간략화 (ex. 5650186 => 565만)
 */

export default function compactNumberFormat(text: number | bigint) {
  return new Intl.NumberFormat('ko-KR', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(text);
}
