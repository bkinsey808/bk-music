import { getNoteNumber } from "./get-note-number";
import { getScaleNumbers } from "./get-scale-numbers";

export const isNoteInScale = (
	keyNote: string,
	scale: string,
	note?: string,
) => {
	const scaleNumbers = getScaleNumbers(keyNote, scale);
	const noteNumber = (getNoteNumber(note) ?? 0) % 12;
	const scaleDegreeIndex = scaleNumbers.indexOf(noteNumber);
	const keyNoteNumber = (getNoteNumber(keyNote) ?? 0) % 12;
	const scaleDegree =
		scaleDegreeIndex === undefined
			? undefined
			: keyNoteNumber === noteNumber
			? "1"
			: scale.split("-")[scaleDegreeIndex];

	return scaleDegree;
};
