import { tablize } from "../tablize";

const result = `
Item        | Count
-------------------
test        |     3
hello       |   399
testinghhhh |     1
`.trim();

describe("Tablize", () => {
	test("Should handle array of arrays", () => {
		const twoDArray = [
			["Item", "Count"],
			["nerdsniping", 3],
			["hello", 1],
			["test", -1]
		];

		const output = tablize(twoDArray);

		expect(output).toBe(result);
	});
});
