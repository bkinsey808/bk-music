import { getChordNumbers } from "./getChordNumbers";
import { getKeyScaleNumbers } from "./getKeyScaleNumbers";
import { Chord, Degree, Scale } from "@/app/d/useDashboardState";

export const getInKeyScale = ({
	chordScaleDegree,
	chord,
	keyNote,
	scale,
}: {
	chordScaleDegree: Degree;
	chord: Chord;
	keyNote: string;
	scale: Scale;
}) => {
	const chordNumbers = getChordNumbers({ chordScaleDegree, chord, keyNote });
	const keyScaleNumbers = getKeyScaleNumbers(keyNote, scale);

	return chordNumbers.every((chordNumber) =>
		keyScaleNumbers.includes(chordNumber),
	);
};
