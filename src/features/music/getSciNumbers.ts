import { getNoteNumber } from "./getNoteNumber";
import { scaleDegreeToNumber } from "./scaleDegreeToNumber";
import { Scale } from "@/app/d/useDashboardState";

export const getSciNumbers = (sci: Scale, keyNote?: string) => {
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;

	return [
		keyNoteNumber,
		...sci.map(
			(scaleDegree) =>
				((scaleDegreeToNumber(scaleDegree) ?? 0) + keyNoteNumber) % 12,
		),
	];
};
