import { getNoteNumber } from "./getNoteNumber";
import { getScaleIndexFromRomanNumeral } from "./getScaleIndexFromRomanNumeral";
import { scaleDegrees } from "./scaleDegrees";
import { useDashboardState } from "@/app/d/useDashboardState";

export const getChordNumbers = (
	chord: ReturnType<typeof useDashboardState>["chord"],
	scaleKeyNote?: string,
) => {
	const chordParts = chord;

	const chordRomanNumeral = chordParts[0];
	// console.log({ chordRomanNumeral });
	const chordScaleIndex = getScaleIndexFromRomanNumeral(chordRomanNumeral);
	const scaleKeyNumber = getNoteNumber(scaleKeyNote) ?? 0;

	if (scaleKeyNumber === undefined || chordScaleIndex === undefined) {
		return [];
	}

	const [, ...chordSpellingArray] = chordParts;

	return [
		0,
		...chordSpellingArray.map((spelling) =>
			scaleDegrees.indexOf(spelling as (typeof scaleDegrees)[number]),
		),
	].map(
		(degree) => ((scaleKeyNumber ?? 0) + degree + (chordScaleIndex ?? 0)) % 12,
	);
};
