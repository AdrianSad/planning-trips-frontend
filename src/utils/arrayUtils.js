export const reorder = (array, startIndex, endIndex) => {
  const newItems = Array.from(array);
  const [removed] = newItems.splice(startIndex, 1);
  newItems.splice(endIndex, 0, removed);
  return newItems;
};
