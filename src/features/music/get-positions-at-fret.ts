import { generateSequences } from "../math/generate-sequences";
import { chordNumbersMatchPositionNumbers } from "./chord-numbers-match-position-number";
import { filterByMaxMuted } from "./filter-by-max-muted";
import { getPositionNumbers } from "./get-position-numbers";
import { getPositionValuesForFret } from "./get-position-values-for-fret";

export const getPositionsAtFret = ({
	fret,
	tuning,
	chordNumbers,
	maxFret,
	maxFretSpan,
	maxMuted,
}: {
	fret: number;
	tuning: string;
	chordNumbers: number[];
	maxFret: number;
	maxFretSpan: number;
	maxMuted: number;
}) => {
	const values = getPositionValuesForFret({
		fret,
		maxFret,
		maxFretSpan,
	});
	const tuningArray = tuning.split("-");
	const positionArrays = generateSequences(values, tuningArray.length)
		.filter(filterByMaxMuted(maxMuted))
		.filter((positionArray) =>
			positionArray.some(
				(positionArrayElement) => positionArrayElement === fret,
			),
		)
		.filter((positionArray) =>
			chordNumbersMatchPositionNumbers(
				chordNumbers,
				getPositionNumbers(positionArray.join("-"), tuning),
			),
		)
		.map((positionArray) => positionArray.join("-"));

	return positionArrays;
};
