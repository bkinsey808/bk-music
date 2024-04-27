import { getNoteNumber } from "./getNoteNumber";
import { scaleDegreeToNumber } from "./scaleDegreeToNumber";
import { Scale } from "@/app/d/useDashboardState";

export const getKeyScaleNumbers = (keyNote: string, scale: Scale) => {
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;

	const scaleNumbers = [
		keyNoteNumber,
		...scale.map((scaleDegree) => {
			const scaleDegreeNumber = scaleDegreeToNumber(scaleDegree) ?? 0;
			return (keyNoteNumber + scaleDegreeNumber) % 12;
		}),
	];

	return scaleNumbers;
};
