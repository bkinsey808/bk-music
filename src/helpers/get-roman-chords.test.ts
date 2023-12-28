import { getRomanChords } from "./get-roman-chords";

describe("getRomanChords", () => {
	it("returns the roman chords", () => {
		expect(getRomanChords("2-3-4-5-6-7")).toEqual({
			"3": ["I", "ii", "iii", "IV", "V", "vi", "viio"],
		});
	});
});
