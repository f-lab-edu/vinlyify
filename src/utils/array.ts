/**
 * 배열 stringBulkList의 인수를 splitCount만큼 재귀적으로 나눠줍니다.
 */
export const chunks: (
  splitCount: number,
) => (stringBulkList: string[]) => string[][] =
  (splitCount: number) => (stringBulkList: string[]) =>
    stringBulkList.length <= 2 * splitCount
      ? [[...stringBulkList]]
      : [
          stringBulkList.slice(0, splitCount),
          ...chunks(splitCount)(stringBulkList.slice(splitCount)),
        ];
