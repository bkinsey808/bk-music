import { getInKeyScale } from "./getInKeyScale";

describe("getInKeyScale", () => {
	it("should return true for a chord in the key scale", () => {
		const chord = "I-3-5";
		const keyScale = "C-2-3-5";
		const result = getInKeyScale(chord, keyScale);
		expect(result).toBe(true);
	});
});
