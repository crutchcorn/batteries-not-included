import { normalizeNumber } from "../normalize-number";

describe("Normalize number", () => {
	test("to not normalize a number that is in-range", async () => {
		const theNum = normalizeNumber(5, 3, 10);
		expect(theNum).toBe(5);
	});

	test("to normalize a number that is too low", async () => {
		const theNum = normalizeNumber(1, 3, 10);
		expect(theNum).toBe(3);
	});

	test("to normalize a number that is too high", async () => {
		const theNum = normalizeNumber(18, 3, 10);
		expect(theNum).toBe(10);
	});
});
