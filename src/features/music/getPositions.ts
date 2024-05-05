import { range } from "../math/range";
import { getChordNumbers } from "./getChordNumbers";
import { getPositionsAtFret } from "./getPositionsAtFret";
import { Chord } from "@/app/d/useDashboardState";

/** given tuning in the form of 'G4-C4-E4-E4' and keyNote in form of 'Eb' and chord in the form of i-b3-5, return an array of position arrays in the form [[2, 0, 0, 0], ...] in the order of chords sorted by smallest fret first */
export const getPositions = ({
	tuning,
	keyNote,
	chord,
	maxMuted = 0,
	maxFret = 17,
	maxFretSpan = 4,
}: {
	tuning: string;
	keyNote: string;
	chord: Chord;
	maxMuted?: number;
	maxFret?: number;
	maxFretSpan?: number;
}) => {
	const chordNumbers = getChordNumbers(chord, keyNote);

	return range(0, maxFret).flatMap((fret) => {
		const positionsAtFret = getPositionsAtFret({
			fret,
			tuning,
			chordNumbers,
			maxFret,
			maxFretSpan,
			maxMuted,
		});
		return positionsAtFret;
	});
};
