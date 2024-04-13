import { getNoteNumber } from "./getNoteNumber";
import { scaleDegreeToNumber } from "./scaleDegreeToNumber";

export const getKeyScaleNumbers = (keyScale: string) => {
	const keyNote = keyScale.split("-")[0];
	const scale = keyScale.split("-").slice(1).join("-");
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;

	const scaleNumbers = [
		keyNoteNumber,
		...scale.split("-").map((scaleDegree) => {
			const scaleDegreeNumber = scaleDegreeToNumber(scaleDegree) ?? 0;
			return (keyNoteNumber + scaleDegreeNumber) % 12;
		}),
	];

	return scaleNumbers;
};
