import { degreeToNumber } from "./degreeToNumber";
import { getNoteNumber } from "./getNoteNumber";
import { Scale } from "@/app/d/useDashboardState";

export const getSciNumbers = (sci: Scale, keyNote?: string) => {
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;

	return [
		keyNoteNumber,
		...sci.map(
			(scaleDegree) =>
				((degreeToNumber(scaleDegree) ?? 0) + keyNoteNumber) % 12,
		),
	];
};
