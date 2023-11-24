import { getNoteNumber } from "./get-note-number";
import { scaleDegreeToNumber } from "./scale-degree-to-number";

export const getSciNumbers = (scale: string, keyNote?: string) => {
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;

	return [
		keyNoteNumber,
		...scale
			.split("-")
			.map(
				(scaleDegree) =>
					((scaleDegreeToNumber(scaleDegree) ?? 0) + keyNoteNumber) % 12,
			),
	];
};
