import { getNoteNumber } from "./get-note-number";

const scaleDegrees = [
	"1",
	"b2",
	"2",
	"b3",
	"3",
	"4",
	"b5",
	"5",
	"b6",
	"6",
	"b7",
	"7",
];

export const getScaleDegree = (keyNote: string, note?: string) => {
	const keyNoteNumber = getNoteNumber(keyNote);
	const noteNumber = getNoteNumber(note);

	if (keyNoteNumber === undefined || noteNumber === undefined) {
		return undefined;
	}

	const scaleDegreeNumber = (noteNumber - keyNoteNumber + 12) % 12;
	return scaleDegrees[scaleDegreeNumber];
};
