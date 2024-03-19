import { getRomanNumerals } from "@/helpers/get-roman-numerals";
import { getSciNumbers } from "@/helpers/get-sci-numbers";
import { range } from "@/helpers/range";
import { sciList, sciListError } from "@/helpers/sci";

export const getChords = ({
	scale,
	minNotes = 2,
	maxNotes = 4,
	scaleIndex,
	preferred = true,
}: {
	scale: string;
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

	const romanNumerals = getRomanNumerals(scale);

	return range(minIndex, maxIndex + 1).flatMap((scaleIndex) => {
		const scaleNumber = scaleNumbers[scaleIndex];

		const modeNumbers = [
			...scaleNumbers.slice(scaleIndex),
			...scaleNumbers.slice(0, scaleIndex),
		]
			// next subtract the first scale number from all the scale numbers
			.map((innerScaleNumber) => (innerScaleNumber - scaleNumber + 12) % 12);

		const romanNumeral = romanNumerals[scaleIndex];

		const chords = sciList
			?.filter((sci) => {
				if (sci.numNote < minNotes || sci.numNote > maxNotes) {
					return false;
				}

				if (preferred && sci.booPrefer === 0) {
					return false;
				}

				const chordNumbers = getSciNumbers(sci.txtSpelling);
				const chordInScale = chordNumbers.every((chordNumber) =>
					modeNumbers.includes(chordNumber),
				);
				return chordInScale;
			})
			.map((sci) => ({ chord: sci, romanNumeral, scaleIndex }));

		return chords;
	});
};
