import { getSciNumbers } from "./get-sci-numbers";

export const chordScaleDegrees = (scale: string, chord: string) => {
	const scaleNumbers = getSciNumbers(scale);
	const chordNumbers = getSciNumbers(chord);

	console.log({ scaleNumbers, chordNumbers });
};
