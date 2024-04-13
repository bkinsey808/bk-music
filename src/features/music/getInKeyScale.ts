import { getChordNumbers } from "./getChordNumbers";
import { getKeyScaleNumbers } from "./getKeyScaleNumbers";

export const getInKeyScale = (chord: string, keyScale: string) => {
	const keyNote = keyScale.split("-")[0];

	const chordNumbers = getChordNumbers(chord, keyNote);
	const keyScaleNumbers = getKeyScaleNumbers(keyScale);

	return chordNumbers.every((chordNumber) =>
		keyScaleNumbers.includes(chordNumber),
	);
};
