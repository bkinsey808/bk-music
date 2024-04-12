import { getNoteNumber } from "./get-note-number";
import { getSciNumbers } from "./get-sci-numbers";

export const isNoteInScale = (
	keyNote: string,
	scale: string,
	note?: string,
) => {
	const sciNumbers = getSciNumbers(scale, keyNote);
	const noteNumber = (getNoteNumber(note) ?? 0) % 12;
	const scaleDegreeIndex = sciNumbers.indexOf(noteNumber);
	const keyNoteNumber = (getNoteNumber(keyNote) ?? 0) % 12;
	const scaleDegree =
		scaleDegreeIndex === undefined
			? undefined
			: keyNoteNumber === noteNumber
				? "1"
				: scale.split("-")[scaleDegreeIndex - 1];

	return !!scaleDegree;
};
