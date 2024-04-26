import { getChordNumbers } from "../music/getChordNumbers";
import { romanNumerals } from "../music/romanNumerals";
import { useDashboardState } from "@/app/d/useDashboardState";
import { range } from "@/features/math/range";
import { getSciNumbers } from "@/features/music/getSciNumbers";
import { sciList, sciListError } from "@/features/music/sci";

export const getChords = ({
	scale,
	minNotes = 2,
	maxNotes = 4,
	scaleIndex,
	preferred = true,
	keyNote,
}: {
	scale: ReturnType<typeof useDashboardState>["scale"];
	minNotes?: number;
	maxNotes?: number;
	scaleIndex?: number;
	preferred?: boolean;
	keyNote?: string;
}) => {
	if (!sciList) {
		console.log({ sciListError });
		// throw new Error("sci-list.json is invalid");
		return;
	}

	const scaleNumbers = getSciNumbers(scale);

	const [minIndex, maxIndex] =
		scaleIndex !== undefined
			? [scaleIndex, scaleIndex]
			: [0, scaleNumbers.length - 1];

	return range(minIndex, maxIndex + 1).flatMap((scaleIndex) => {
		const romanNumeral = romanNumerals[scaleIndex];

		const chords = sciList
			?.filter((sci) => {
				if (sci.numNote < minNotes || sci.numNote > maxNotes) {
					return false;
				}

				if (preferred && sci.booPrefer === 0) {
					return false;
				}

				const chord =
					`${romanNumeral}-${sci.txtSpelling.replaceAll(",", "-")}`.split("-");
				const chordNumbers = getChordNumbers(chord, keyNote);
				const chordInScale = chordNumbers.every((chordNumber) =>
					scaleNumbers.includes(chordNumber),
				);
				return chordInScale;
			})
			.map((sci) => ({ sci, chord: sci.txtSpelling, romanNumeral }));

		return chords;
	});
};
