import { generateSequences } from "../math/generateSequences";
import { chordNumbersMatchPositionNumbers } from "./chordNumbersMatchPositionNumber";
import { filterByMaxMuted } from "./filterByMaxMuted";
import { getPositionNumbers } from "./getPositionNumbers";
import { getPositionValuesForFret } from "./getPositionValuesForFret";

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
