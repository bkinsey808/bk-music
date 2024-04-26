import { getInKeyScale } from "./getInKeyScale";

describe("getInKeyScale", () => {
	it("should return true for a chord in the key scale", () => {
		const chord = "I-3-5".split("-");
		const keyNote = "C";
		const scale = "2-3-5".split("-");
		const result = getInKeyScale(chord, keyNote, scale);
		expect(result).toBe(true);
	});
});
