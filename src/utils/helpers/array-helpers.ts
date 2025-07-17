export const updateObjectInArray = <T, K extends object>(
  items: T[],
  itemId: number | string,
  objPropName: keyof T,
  newObjProps: K
) =>
  items.map((item) => {
    if (item[objPropName] === itemId) {
      return { ...item, ...newObjProps };
    }

    return item;
  });

export const checkInProgress = (
  array: (number | string)[],
  id: number | string
) => array.includes(id);

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
