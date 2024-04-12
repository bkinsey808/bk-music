import { getChordNumbers } from "./get-chord-numbers";

describe("getChordNumbers", () => {
	it("should return the correct chord numbers", () => {
		expect(getChordNumbers("I-3-5", "C")).toEqual([0, 4, 7]);
		expect(getChordNumbers("bii-3-5", "C")).toEqual([1, 5, 8]);
		expect(getChordNumbers("ii-3-5", "C")).toEqual([2, 6, 9]);
		expect(getChordNumbers("I-3-5", "Db")).toEqual([1, 5, 8]);
		expect(getChordNumbers("bii-3-5", "Db")).toEqual([2, 6, 9]);
	});

	it("should return the correct chord numbers for different chord types", () => {
		expect(getChordNumbers("I-3-5-7", "C")).toEqual([0, 4, 7, 11]);
		expect(getChordNumbers("IV-3-5-7", "C")).toEqual([5, 9, 0, 4]);
		expect(getChordNumbers("V-3-5-7", "C")).toEqual([7, 11, 2, 6]);
	});

	it("should return an empty array for invalid chord input", () => {
		expect(getChordNumbers("invalid-chord", "C")).toEqual([]);
		expect(getChordNumbers("", "C")).toEqual([]);
	});

	it("should return an empty array for invalid scale key note input", () => {
		expect(getChordNumbers("I-3-5", "invalid-note")).toEqual([]);
		expect(getChordNumbers("I-3-5", "")).toEqual([]);
	});
});
