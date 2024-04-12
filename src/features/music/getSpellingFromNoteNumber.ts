import { scaleDegrees } from "./scaleDegrees";

export const getSpellingFromNoteNumber = (noteNumber: number) => {
	noteNumber = noteNumber % 12;
	return scaleDegrees[noteNumber];
};
