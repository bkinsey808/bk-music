import { getPositionValuesForFret } from "./get-position-values-for-fret";

describe("getPositionValuesForFret", () => {
	it("returns correct position values for fret", () => {
		expect(
			getPositionValuesForFret({
				fret: 16,
				maxFret: 17,
				maxFretSpan: 5,
			}),
		).toEqual([0, "x", 16, 17]);
	});
});
