import { getTuningNumbers } from "./getTuningNumbers";
import { Position, Tuning } from "@/app/d/types";

export const getPositionNumbers = (position: Position, tuning: Tuning) => {
	const tuningNumbers = getTuningNumbers(tuning);

	return Array.from(
		position.reduce((positionSet, positionElement, course) => {
			if (positionElement !== "x") {
				positionSet.add((tuningNumbers[course] ?? 0) + positionElement);
			}
			return positionSet;
		}, new Set<number>()),
	).sort();
};
