import { getPositionArray } from "./getPositionArray";
import { getTuningNumbers } from "./getTuningNumbers";
import { Position, Tuning } from "@/app/d/useDashboardState";

export const getPositionNumbers = (position: Position, tuning: Tuning) => {
	const positionArray = getPositionArray(position);
	const tuningNumbers = getTuningNumbers(tuning);

	return Array.from(
		positionArray.reduce((positionSet, positionElement, course) => {
			if (positionElement !== "x") {
				positionSet.add((tuningNumbers[course] ?? 0) + positionElement);
			}
			return positionSet;
		}, new Set<number>()),
	).sort();
};
