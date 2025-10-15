/** decimalPoint 자릿수까지 반올림한 값 */
const roundToDecimalPoint = (
  num: number,
  round: 'up' | 'down' | 'round' = 'up',
  decimalPoint = 0,
) => {
  if (round === 'up') {
    return Math.ceil(num * 10 ** decimalPoint) / 10 ** decimalPoint;
  } else if (round === 'down') {
    return Math.floor(num * 10 ** decimalPoint) / 10 ** decimalPoint;
  }
  return Math.round(num * 10 ** decimalPoint) / 10 ** decimalPoint;
};

export default roundToDecimalPoint;
