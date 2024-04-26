import { getChordNumbers } from "./getChordNumbers";
import { getKeyScaleNumbers } from "./getKeyScaleNumbers";
import { useDashboardState } from "@/app/d/useDashboardState";

export const getInKeyScale = (
	chord: ReturnType<typeof useDashboardState>["chord"],
	keyNote: string,
	scale: ReturnType<typeof useDashboardState>["scale"],
) => {
	const chordNumbers = getChordNumbers(chord, keyNote);
	const keyScaleNumbers = getKeyScaleNumbers(keyNote, scale);

	return chordNumbers.every((chordNumber) =>
		keyScaleNumbers.includes(chordNumber),
	);
};
