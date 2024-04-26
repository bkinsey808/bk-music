import { isNoteInScale } from "./isNoteInScale";

describe("isNoteInScale", () => {
	it("returns undefined if the note is not in the scale", () => {
		expect(isNoteInScale("C", "2-3-4-5-6-7".split("-"), "C")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7".split("-"), "C#")).toBe(false);
	});

	it("returns the scale degree if the note is in the scale", () => {
		expect(isNoteInScale("C", "2-3-4-5-6-7".split("-"), "D")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7".split("-"), "E")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7".split("-"), "F")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7".split("-"), "G")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7".split("-"), "A")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7".split("-"), "B")).toBe(true);

		expect(isNoteInScale("Db", "2-3-4-5-6-7".split("-"), "Db")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7".split("-"), "Eb")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7".split("-"), "F")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7".split("-"), "Gb")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7".split("-"), "Ab")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7".split("-"), "Bb")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7".split("-"), "C")).toBe(true);

		expect(isNoteInScale("B#", "1-2-3-4-5-6-7".split("-"), "C")).toBe(true);
		expect(isNoteInScale("E#", "1-2-3-4-5-6-7".split("-"), "C")).toBe(true);
	});
});
