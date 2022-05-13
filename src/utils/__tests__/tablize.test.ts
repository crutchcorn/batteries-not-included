import { tablize } from "../tablize";

const twoLevelResult = `
Item    | Count
---------------
Apples  |     3
Oranges |   399
Bananas |     1
`.trim();

const threeColumns = `
Item    | Count | Another count
-------------------------------
Apples  |     3 |    1939889988
Oranges |   399 |           213
Bananas |     1 |    -129389176
`.trim();

describe("Tablize", () => {
	test("Should handle array of arrays", () => {
		const twoDArray = [
			["Item", "Count"],
			["Apples", 3],
			["Oranges", 399],
			["Bananas", 1],
		];

		const output = tablize(twoDArray);

		expect(output).toBe(twoLevelResult);
	});

	test("Should handle array of arrays with three columns", () => {
		const twoDArray = [
			["Item", "Count", "Another count"],
			["Apples", 3, 1939889988],
			["Oranges", 399, 213],
			["Bananas", 1, -129389176],
		];

		const output = tablize(twoDArray);

		expect(output).toBe(threeColumns);
	});
});
