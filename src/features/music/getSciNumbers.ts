import { getNoteNumber } from "./getNoteNumber";
import { scaleDegreeToNumber } from "./scaleDegreeToNumber";
import { useDashboardState } from "@/app/d/useDashboardState";

export const getSciNumbers = (
	sci: ReturnType<typeof useDashboardState>["scale"],
	keyNote?: string,
) => {
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;

	return [
		keyNoteNumber,
		...sci.map(
			(scaleDegree) =>
				((scaleDegreeToNumber(scaleDegree) ?? 0) + keyNoteNumber) % 12,
		),
	];
};
