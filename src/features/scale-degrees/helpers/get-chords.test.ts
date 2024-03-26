import { getChords } from "./get-chords";

describe("getChords", () => {
	it("returns the roman chords", () => {
		const _expected = [
			"M",
			"Mb5",
			"+",
			"sus4",
			"2",
			"-2",
			"WTet",
			"4",
			"M7",
			"7",
			"RNig",
			"7b5",
			"+7",
			"M7#5",
			"7sus4",
			"-Tet",
			"His",
			"RSum",
			"-TC",
			"M2TetC1",
			"7om3",
			"n7sus4",
			"Ser",
			"Nora",
			"P7",
			"M7om5",
			"7om5",
			"Fel",
			"GM",
			"WM",
			"Con",
		];
		const _results = getChords({
			scale: "2-3-4-5-6-7",
			minNotes: 3,
			scaleIndex: 0,
		});
		// expect(results).toEqual({ chords: expected });
	});
});
