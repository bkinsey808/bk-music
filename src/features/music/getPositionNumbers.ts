import { getPositionArray } from "./getPositionArray";
import { getTuningNumbers } from "./getTuningNumbers";

export const getPositionNumbers = (position: string, tuning: string) => {
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
