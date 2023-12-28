import { getNoteNumber } from "./get-note-number";
import { getSciNumbers } from "./get-sci-numbers";

// unfinished
export const isNoteInScale = (
	keyNote: string,
	scale: string,
	note?: string,
) => {
	const n = 42;
	console.log(n);
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

	// console.log({
	// 	scale,
	// 	keyNote,
	// 	sciNumbers,
	// 	note,
	// 	noteNumber,
	// 	scaleDegreeIndex,
	// 	keyNoteNumber,
	// 	scaleDegree,
	// });
	return scaleDegree;
};
