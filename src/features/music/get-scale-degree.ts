import { getNoteNumber } from "./get-note-number";
import { scaleDegrees } from "./scale-degrees";

export const getScaleDegree = (keyNote: string, note?: string) => {
	const keyNoteNumber = getNoteNumber(keyNote);
	const noteNumber = getNoteNumber(note);

	if (keyNoteNumber === undefined || noteNumber === undefined) {
		return undefined;
	}

	const scaleDegreeNumber = (noteNumber - keyNoteNumber + 12) % 12;
	return scaleDegrees[scaleDegreeNumber];
};
