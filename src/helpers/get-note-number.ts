import { letterAndAccidentalToNumber } from "./letter-and-accidental-to-number";

export const getNoteNumber = (note?: string) => {
	if (note === undefined) {
		return undefined;
	}

	const noteRegex = /([A-G][b#]{0,2})(\d)?/;
	const noteParts = note.match(noteRegex);

	if (!noteParts) {
		return undefined;
	}

	const letterAndAccidental = noteParts[1];
	const octave = parseInt(noteParts[2] ?? "0");
	const letterAndAccidentalNumber =
		letterAndAccidentalToNumber(letterAndAccidental);
	return letterAndAccidentalNumber + octave * 12;
};
