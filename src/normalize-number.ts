/**
 * A function to return a safe value between two ranges
 * @param {number} numberToNormalize
 * @param {number} minIndex
 * @param {number} maxIndex
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
