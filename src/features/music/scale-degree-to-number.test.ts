import { scaleDegreeToNumber } from "./scale-degree-to-number";

describe("scaleDegreeToNumber", () => {
	it("returns the scale degree if the note is in the scale", () => {
		expect(scaleDegreeToNumber("1")).toBe(0);
		expect(scaleDegreeToNumber("2")).toBe(2);
		expect(scaleDegreeToNumber("3")).toBe(4);
		expect(scaleDegreeToNumber("4")).toBe(5);
		expect(scaleDegreeToNumber("5")).toBe(7);
		expect(scaleDegreeToNumber("6")).toBe(9);
		expect(scaleDegreeToNumber("7")).toBe(11);

		expect(scaleDegreeToNumber("b1")).toBe(11);
		expect(scaleDegreeToNumber("b2")).toBe(1);
		expect(scaleDegreeToNumber("b3")).toBe(3);
		expect(scaleDegreeToNumber("b4")).toBe(4);
		expect(scaleDegreeToNumber("b5")).toBe(6);
		expect(scaleDegreeToNumber("b6")).toBe(8);
		expect(scaleDegreeToNumber("b7")).toBe(10);

		expect(scaleDegreeToNumber("bb1")).toBe(10);
		expect(scaleDegreeToNumber("bb2")).toBe(0);
		expect(scaleDegreeToNumber("bb3")).toBe(2);
		expect(scaleDegreeToNumber("bb4")).toBe(3);
		expect(scaleDegreeToNumber("bb5")).toBe(5);
		expect(scaleDegreeToNumber("bb6")).toBe(7);
		expect(scaleDegreeToNumber("bb7")).toBe(9);

		expect(scaleDegreeToNumber("#1")).toBe(1);
		expect(scaleDegreeToNumber("#2")).toBe(3);
		expect(scaleDegreeToNumber("#3")).toBe(5);
		expect(scaleDegreeToNumber("#4")).toBe(6);
		expect(scaleDegreeToNumber("#5")).toBe(8);
		expect(scaleDegreeToNumber("#6")).toBe(10);
		expect(scaleDegreeToNumber("#7")).toBe(0);

		expect(scaleDegreeToNumber("##1")).toBe(2);
		expect(scaleDegreeToNumber("##2")).toBe(4);
		expect(scaleDegreeToNumber("##3")).toBe(6);
		expect(scaleDegreeToNumber("##4")).toBe(7);
		expect(scaleDegreeToNumber("##5")).toBe(9);
		expect(scaleDegreeToNumber("##6")).toBe(11);
		expect(scaleDegreeToNumber("##7")).toBe(1);
	});
});
