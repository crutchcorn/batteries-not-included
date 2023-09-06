export const getArrayAddedAndRemoved = <T>(
  list1: T[],
  list2: T[],
  compareFn: (val: T, otherVal: T) => boolean = (val1, val2) => val1 === val2
): { added: T[]; removed: T[] } => {
  const isList1Longer = list1.length >= list2.length;
  const longestList = isList1Longer ? list1 : list2;
  const shortestList = isList1Longer ? list2 : list1;
  const shouldFlipAtEndToMakeMatchOriginalArrOrder = isList1Longer;

  // We will assume that every item has been added and then widdle that list down to being accurate
  const added: T[] = longestList;
  const removed: T[] = [];

  for (const shortItem of shortestList) {
    const indexToRemoveFromAdded = added.findIndex((longItem) =>
      compareFn(shortItem, longItem)
    );

    if (indexToRemoveFromAdded === -1) {
      removed.push(shortItem);
      continue;
    }

    added.splice(indexToRemoveFromAdded, 1);
  }

  return {
    added: shouldFlipAtEndToMakeMatchOriginalArrOrder ? removed : added,
    removed: shouldFlipAtEndToMakeMatchOriginalArrOrder ? added : removed,
  };
};
