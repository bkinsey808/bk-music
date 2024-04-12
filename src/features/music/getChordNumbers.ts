import { getNoteNumber } from "./getNoteNumber";
import { getScaleIndexFromRomanNumeral } from "./getScaleIndexFromRomanNumeral";
import { scaleDegrees } from "./scaleDegrees";

export const getChordNumbers = (chord: string, scaleKeyNote: string) => {
	const chordParts = chord.split("-");

	const chordRomanNumeral = chordParts[0];
	const chordScaleIndex = getScaleIndexFromRomanNumeral(chordRomanNumeral);
	const scaleKeyNumber = getNoteNumber(scaleKeyNote);
	const [, ...chordSpellingArray] = chordParts;

	if (scaleKeyNumber === undefined || chordScaleIndex === undefined) {
		return [];
	}

	return [
		0,
		...chordSpellingArray.map((spelling) =>
			scaleDegrees.indexOf(spelling as (typeof scaleDegrees)[number]),
		),
	].map(
		(degree) => ((scaleKeyNumber ?? 0) + degree + (chordScaleIndex ?? 0)) % 12,
	);
};
