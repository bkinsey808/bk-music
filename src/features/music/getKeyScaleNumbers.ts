import { degreeToNumber } from "./degreeToNumber";
import { getNoteNumber } from "./getNoteNumber";
import { Scale } from "@/app/d/useDashboardState";

export const getKeyScaleNumbers = ({
	keyNote,
	scale,
}: {
	keyNote?: string | undefined;
	scale: Scale;
}) => {
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;

	const scaleNumbers = [
		keyNoteNumber,
		...scale.map((scaleDegree) => {
			const scaleDegreeNumber = degreeToNumber(scaleDegree) ?? 0;
			return (keyNoteNumber + scaleDegreeNumber) % 12;
		}),
	];

	return scaleNumbers;
};
