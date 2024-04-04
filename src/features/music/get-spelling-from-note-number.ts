import { scaleDegrees } from "./scale-degrees";

export const getSpellingFromNoteNumber = (noteNumber: number) => {
	noteNumber = noteNumber % 12;
	return scaleDegrees[noteNumber];
};
