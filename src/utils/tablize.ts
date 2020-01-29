export const tablize = () => {
	const state = { test: 3, hello: 399, testinghhhh: 1 };

	const stateWords = Object.keys(state);
	const stateNumbers = Object.values(state);

	const itemStr = "Item";
	const countStr = "Count";

	let longestWord = itemStr.length;
	let longestNumber = countStr.length;

	for (const word of stateWords) {
		// Add one for the ` ` after the entry
		longestWord = longestWord < word.length ? word.length : longestWord;
	}

	for (const number of stateNumbers) {
		const numStr = `${number}`;
		longestNumber =
			longestNumber < numStr.length ? numStr.length : longestNumber;
	}

	const getSpacing = (str: string, char: string, max: number): string => {
		const addedLength = max - str.length;
		return char.repeat(addedLength);
	};

	const headerStr1 = `${itemStr}${getSpacing(itemStr, " ", longestWord)}`;
	const headerStr2 = `${countStr}${getSpacing(countStr, " ", longestNumber)}`;
	const headerStr = `${headerStr1} | ${headerStr2}`;
	// Plus three because of the two spaces plus the `|`
	const totalLength = headerStr.length;
	const seperatorStr = getSpacing("", "-", totalLength);
	const initialHeader = `${headerStr}\n${seperatorStr}\n`;

	const tableString = stateWords.reduce((stateStr, word) => {
		const numberOfInstances = `${state[word as keyof typeof state]}`;
		const addedSpaceWord = getSpacing(word, " ", longestWord);
		const addedSpaceNumber = getSpacing(numberOfInstances, " ", longestNumber);
		return `${stateStr}${word}${addedSpaceWord} | ${addedSpaceNumber}${numberOfInstances}\n`;
	}, initialHeader);

	return tableString.trim();
};
