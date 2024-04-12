import { getNoteNumber } from "./getNoteNumber";

export const getTuningNumbers = (tuning: string) =>
	tuning.split("-").map((course) => getNoteNumber(course));
