import { getNoteNumber } from "./getNoteNumber";
import { Tuning } from "@/app/d/useDashboardState";

export const getTuningNumbers = (tuning: Tuning) =>
	tuning.map((course) => getNoteNumber(course));
