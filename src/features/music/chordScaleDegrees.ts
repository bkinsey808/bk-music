import { getNoteFromNumber } from "./getNoteFromNumber";
import { getSciNumbers } from "./getSciNumbers";
import { scaleDegrees } from "./scaleDegrees";
import { useDashboardState } from "@/app/d/useDashboardState";

/** given a scale in the form of '2-b3-4-5-b6-7', and a chord in the form of 'b3-5',
 *  return the array of scale degrees of where the chord is found on the scale.
 *
 *  for example '2-3-4-5-6-7' and '3-5' would return ['1', '4', '5'] because the major chord is found at
 *  the 1st, 4th, and 5th degrees of the major scale.
 */
export const chordScaleDegrees = (
	scale: ReturnType<typeof useDashboardState>["scale"],
	chord: ReturnType<typeof useDashboardState>["chord"],
) => {
	const scaleNumbers = getSciNumbers(scale);

	// map over the scale degrees
	return scaleNumbers.reduce((acc, scaleNumber, index) => {
		// check if the scale degree is in the chord
		// if it is, add it to the array
		// if it isn't, do nothing

		const noteAtScaleDegree = getNoteFromNumber({ noteNumber: scaleNumber });
		const chordNumbers = getSciNumbers(chord, noteAtScaleDegree);

		const chordInScale = chordNumbers.every((chordNumber) =>
			scaleNumbers.includes(chordNumber),
		);

		if (chordInScale) {
			const scaleDegree = scaleDegrees[scaleNumbers[index]];
			acc.push(scaleDegree);
		}

		return acc;
	}, [] as string[]);
};
