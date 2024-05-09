import { degrees } from "./degrees";
import { getNoteNumber } from "./getNoteNumber";
import { getScaleIndexFromRomanNumeral } from "./getScaleIndexFromRomanNumeral";
import { Chord } from "@/app/d/useDashboardState";

export const getChordNumbers = (chord: Chord, scaleKeyNote?: string) => {
	const chordParts = chord;
	const chordRomanNumeral = chordParts[0];
	const chordScaleIndex = getScaleIndexFromRomanNumeral(chordRomanNumeral);
	const scaleKeyNumber = getNoteNumber(scaleKeyNote) ?? 0;

	if (scaleKeyNumber === undefined || chordScaleIndex === undefined) {
		return [];
	}

	const [, ...chordSpellingArray] = chordParts;

	return [
		0,
		...chordSpellingArray.map((spelling) =>
			degrees.indexOf(spelling as (typeof degrees)[number]),
		),
	].map(
		(degree) => ((scaleKeyNumber ?? 0) + degree + (chordScaleIndex ?? 0)) % 12,
	);
};
