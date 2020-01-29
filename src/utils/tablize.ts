/**
 * Export body and header as two seperate functions
 * Also export "headerize" as a way to remove the top array from the bottom
 * Use tablize as a way to do both
 */

export const tablize = <T extends any>(twoDimentionalArray: T[][]) => {
	const copyArray = [...twoDimentionalArray];
	let longestKey = 0;
	let longestValue = 0;

	for (const [key, _] of twoDimentionalArray) {
		// Add one for the ` ` after the entry
		const keyStr = `${key}`;
		longestKey = longestKey < keyStr.length ? keyStr.length : longestKey;
	}

	for (const [_, value] of twoDimentionalArray) {
		const valueStr = `${value}`;
		longestValue =
			longestValue < valueStr.length ? valueStr.length : longestValue;
	}

	const getSpacing = (str: string, char: string, max: number): string => {
		const addedLength = max - str.length;
		return char.repeat(addedLength);
	};

	const headers: string[] = copyArray.shift() as any;
	const body: string[][] = copyArray as any;

	const headerStr1 = `${headers[0]}${getSpacing(
		`${headers[0]}`,
		" ",
		longestKey
	)}`;
	const headerStr2 = `${headers[1]}${getSpacing(
		`${headers[1]}`,
		" ",
		longestValue
	)}`;
	const headerStr = `${headerStr1} | ${headerStr2}`;
	// Plus three because of the two spaces plus the `|`
	const totalLength = headerStr.length;
	const seperatorStr = getSpacing("", "-", totalLength);
	const initialHeader = `${headerStr}\n${seperatorStr}\n`;

	const tableString =
		body?.reduce((stateStr, [key, value]) => {
			const addedSpaceKey = getSpacing(`${key}`, " ", longestKey);
			const addedSpaceValue = getSpacing(`${value}`, " ", longestValue);
			return `${stateStr}${key}${addedSpaceKey} | ${addedSpaceValue}${value}\n`;
		}, initialHeader) || "";

	return tableString.trim();
};
