import { getNoteNumber } from "./get-note-number";

export const getTuningNumbers = (tuning: string) =>
	tuning.split("-").map((course) => getNoteNumber(course));
