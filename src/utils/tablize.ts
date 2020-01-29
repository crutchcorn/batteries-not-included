/**
 * Export body and header as two seperate functions
 * Also export "headerize" as a way to remove the top array from the bottom
 * Use tablize as a way to do both
 */

export const tablize = <T extends any>(twoDimentionalArray: T[][]): string => {
	// This array will include the number that each column should be the size of
	const longestStringInEachColumn = new Array(
		twoDimentionalArray[0].length
	).fill(0);

	for (const row of twoDimentionalArray) {
		for (let i = 0; i < row.length; i++) {
			const columnRowValue = `${row[i]}`;
			if (columnRowValue.length > longestStringInEachColumn[i]) {
				longestStringInEachColumn[i] = columnRowValue.length;
			}
		}
	}

	const getSpacing = (str: string, char: string, max: number): string => {
		const addedLength = max - str.length;
		return char.repeat(addedLength);
	};

	const copyArray = [...twoDimentionalArray];

	const headers: string[] = copyArray.shift() as any;
	const body: string[][] = copyArray as any;

	// Get the spaced out versions of the strings for all of the headers
	const headersStrings = headers.map(
		(headerStr, columnIndex) =>
			`${headerStr}${getSpacing(
				headerStr,
				" ",
				longestStringInEachColumn[columnIndex]
			)}`
	);

	// Then join them with `|`
	const headerStr = headersStrings.join(" | ");

	// Plus three because of the two spaces plus the `|`
	const totalLength = headerStr.length;
	const seperatorStr = getSpacing("", "-", totalLength);
	const initialHeader = `${headerStr}\n${seperatorStr}\n`;

	const tableString =
		body!.reduce((bodyStrPrev, bodyRowArr) => {
			const rowVals = bodyRowArr.map((bodyRowColumnValue, columnIndex) => {
				const rowValSpacing = getSpacing(
					`${bodyRowColumnValue}`,
					" ",
					longestStringInEachColumn[columnIndex]
				);

				if (typeof bodyRowColumnValue == "number")
					return `${rowValSpacing}${bodyRowColumnValue}`;
				return `${bodyRowColumnValue}${rowValSpacing}`;
			});

			const rowString = rowVals.join(" | ");

			return `${bodyStrPrev}${rowString}\n`;
		}, initialHeader) || "";

	return tableString.trim();
};
