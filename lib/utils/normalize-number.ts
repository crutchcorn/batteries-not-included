/**
 * A function to return a safe value between two ranges.
 * @param {number} numberToNormalize - The number to check
 * @param {number} minIndex - This will be returned if the number is lower than it
 * @param {number} maxIndex - This will be returned if the number is higher than it
 * @returns {number}
 */
export const normalizeNumber = (
  numberToNormalize: number,
  minIndex: number,
  maxIndex: number
) => {
  if (numberToNormalize > maxIndex) {
    return maxIndex;
  }

  if (numberToNormalize < minIndex) {
    return minIndex;
  }

  return numberToNormalize;
};
