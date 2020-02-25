import { wrapNumber } from "../wrap-number";

describe("Wrap number", () => {
	test("to not wrap a number that is in-range", async () => {
		const theNum = wrapNumber(5, 3, 10);
		expect(theNum).toBe(5);
	});

	test("to wrap a number that is too low", async () => {
		const theNum = wrapNumber(1, 3, 10);
		expect(theNum).toBe(10);
	});

	test("to wrap a number that is too high", async () => {
		const theNum = wrapNumber(18, 3, 10);
		expect(theNum).toBe(3);
	});
});
