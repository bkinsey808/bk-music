import { chordScaleDegrees } from "./chord-scale-degrees";

describe("chordScaleDegrees", () => {
	it("returns the scale degree if the note is in the scale", () => {
		expect(chordScaleDegrees("2-3-4-5-6-7", "3-5")).toEqual(["1", "4", "5"]);
		expect(chordScaleDegrees("2-3-4-5-6-7", "b3-5")).toEqual(["2", "3", "6"]);
		expect(chordScaleDegrees("2-3-4-5-6-7", "b3-b5")).toEqual(["7"]);
		expect(chordScaleDegrees("2-3-4-5-6-7", "b3-b5-b7")).toEqual(["7"]);
		expect(chordScaleDegrees("2-3-4-5-6-7", "4-5")).toEqual([
			"1",
			"2",
			"3",
			"5",
			"6",
		]);
		expect(chordScaleDegrees("2-3-4-5-6-7", "3-b6")).toEqual([]);
	});
});
