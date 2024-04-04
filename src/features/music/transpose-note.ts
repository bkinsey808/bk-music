import { getNoteFromNumber } from "./get-note-from-number";
import { getNoteNumber } from "./get-note-number";

/** notes can take the form of C#4 or Db4, etc */
export const transposeNote = (note: string, interval: number) => {
	const noteNumber = getNoteNumber(note);

	if (noteNumber === undefined) {
		return undefined;
	}

	const newNoteNumber = noteNumber + interval;
	return getNoteFromNumber(newNoteNumber, !note.includes("#"));
};
