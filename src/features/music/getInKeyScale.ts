import { getChordNumbers } from "./getChordNumbers";
import { getKeyScaleNumbers } from "./getKeyScaleNumbers";
import { Chord, Scale } from "@/app/d/useDashboardState";

export const getInKeyScale = (chord: Chord, keyNote: string, scale: Scale) => {
	const chordNumbers = getChordNumbers(chord, keyNote);
	const keyScaleNumbers = getKeyScaleNumbers(keyNote, scale);

	return chordNumbers.every((chordNumber) =>
		keyScaleNumbers.includes(chordNumber),
	);
};
