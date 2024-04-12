import { getNoteNumber } from "./getNoteNumber";
import { scaleDegreeToNumber } from "./scaleDegreeToNumber";

export const getSciNumbers = (sci: string, keyNote?: string) => {
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;

	return [
		keyNoteNumber,
		...sci
			.split("-")
			.map(
				(scaleDegree) =>
					((scaleDegreeToNumber(scaleDegree) ?? 0) + keyNoteNumber) % 12,
			),
	];
};
