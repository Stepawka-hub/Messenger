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
