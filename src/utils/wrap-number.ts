/**
 * A function to allow wrapping from the beginning of a series of numbers to the end, and from the end of the series to the beginning.
 * @param {number} numberToWrap - The number to check
 * @param {number} minIndex - This will be returned if the number is lower than it
 * @param {number} maxIndex - This will be returned if the number is higher than it
 * @returns {number}
 */
export const wrapNumber = (
	numberToWrap: number,
	minIndex: number,
	maxIndex: number
) => {
	if (numberToWrap > maxIndex) {
		return minIndex;
	}

	if (numberToWrap < minIndex) {
		return maxIndex;
	}

	return numberToWrap;
};
