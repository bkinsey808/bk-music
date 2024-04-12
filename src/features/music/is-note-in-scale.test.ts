import { isNoteInScale } from "./is-note-in-scale";

describe("isNoteInScale", () => {
	it("returns undefined if the note is not in the scale", () => {
		expect(isNoteInScale("C", "2-3-4-5-6-7", "C")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7", "C#")).toBe(false);
	});

	it("returns the scale degree if the note is in the scale", () => {
		expect(isNoteInScale("C", "2-3-4-5-6-7", "D")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7", "E")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7", "F")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7", "G")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7", "A")).toBe(true);
		expect(isNoteInScale("C", "2-3-4-5-6-7", "B")).toBe(true);

		expect(isNoteInScale("Db", "2-3-4-5-6-7", "Db")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "Eb")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "F")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "Gb")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "Ab")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "Bb")).toBe(true);
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "C")).toBe(true);

		expect(isNoteInScale("B#", "1-2-3-4-5-6-7", "C")).toBe(true);
		expect(isNoteInScale("E#", "1-2-3-4-5-6-7", "C")).toBe(true);
	});
});
