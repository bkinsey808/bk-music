import { degrees } from "./degrees";
import { getNoteNumber } from "./getNoteNumber";
import { Chord, Degree } from "@/app/d/useDashboardState";

export const getChordNumbers = ({
	chordScaleDegree,
	chord,
	keyNote,
}: {
	chordScaleDegree: Degree;
	chord: Chord;
	keyNote?: string | undefined;
}) => {
	const chordScaleIndex = chordScaleDegree
		? degrees.indexOf(chordScaleDegree)
		: undefined;

	const scaleKeyNumber = getNoteNumber(keyNote) ?? 0;

	if (scaleKeyNumber === undefined || chordScaleIndex === undefined) {
		return [];
	}

	return [
		0,
		...chord.map((spelling) =>
			degrees.indexOf(spelling as (typeof degrees)[number]),
		),
	].map(
		(degree) => ((scaleKeyNumber ?? 0) + degree + (chordScaleIndex ?? 0)) % 12,
	);
};
