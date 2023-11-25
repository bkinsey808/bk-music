import { isNoteInScale } from "./is-note-in-scale";

describe("isNoteInScale", () => {
	it("returns undefined if the note is not in the scale", () => {
		expect(isNoteInScale("C", "2-3-4-5-6-7", "C")).toBe("1");
		expect(isNoteInScale("C", "2-3-4-5-6-7", "C#")).toBe(undefined);
	});

	it("returns the scale degree if the note is in the scale", () => {
		expect(isNoteInScale("C", "2-3-4-5-6-7", "D")).toBe("2");
		expect(isNoteInScale("C", "2-3-4-5-6-7", "E")).toBe("3");
		expect(isNoteInScale("C", "2-3-4-5-6-7", "F")).toBe("4");
		expect(isNoteInScale("C", "2-3-4-5-6-7", "G")).toBe("5");
		expect(isNoteInScale("C", "2-3-4-5-6-7", "A")).toBe("6");
		expect(isNoteInScale("C", "2-3-4-5-6-7", "B")).toBe("7");

		expect(isNoteInScale("Db", "2-3-4-5-6-7", "Db")).toBe("1");
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "Eb")).toBe("2");
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "F")).toBe("3");
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "Gb")).toBe("4");
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "Ab")).toBe("5");
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "Bb")).toBe("6");
		expect(isNoteInScale("Db", "2-3-4-5-6-7", "C")).toBe("7");
	});
});
