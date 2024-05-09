import { generateSequences } from "../math/generateSequences";
import { chordNumbersMatchPositionNumbers } from "./chordNumbersMatchPositionNumber";
import { filterByMaxMuted } from "./filterByMaxMuted";
import { getPositionNumbers } from "./getPositionNumbers";
import { getPositionValuesForFret } from "./getPositionValuesForFret";
import { Position, Tuning } from "@/app/d/useDashboardState";

export const getPositionsAtFret = ({
	fret,
	tuning,
	chordNumbers,
	maxFret,
	maxFretSpan,
	maxMuted,
}: {
	fret: number;
	tuning: Tuning;
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
	const positionArrays = generateSequences(values, tuning.length)
		.filter(filterByMaxMuted(maxMuted))
		.filter((positionArray) =>
			positionArray.some(
				(positionArrayElement) => positionArrayElement === fret,
			),
		)
		.filter((positionArray) =>
			chordNumbersMatchPositionNumbers(
				chordNumbers,
				getPositionNumbers(positionArray as Position, tuning),
			),
		);

	return positionArrays;
};
