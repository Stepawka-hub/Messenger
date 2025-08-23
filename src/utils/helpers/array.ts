export const checkInProgress = <T>(array: T[], id: T) => array.includes(id);

export const removeFromArray = <T>(array: T[], item: T) =>
  array.filter((i) => i !== item);

export const getPaginatedItems = <T>(
  array: T[],
  page: number,
  size: number
) => {
  const startIdx = (page - 1) * size;
  const endIdx = startIdx + size;
  const prepareEndIdx = endIdx > array.length ? array.length : endIdx;
  return array.slice(startIdx, prepareEndIdx);
};
