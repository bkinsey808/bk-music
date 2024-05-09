import { getKeys } from "../global/getKeys";
import * as tunings from "@/features/music/tunings.json";

const instrumentNames = getKeys(tunings).filter(
	(instrumentName) => String(instrumentName) !== "default",
);

export const instrumentTuningMap = instrumentNames.reduce(
	(acc, instrumentName) => {
		const instrument = tunings[instrumentName];
		const instrumentTuningNames: string[] = getKeys(instrument);

		const dataListMap = instrumentTuningNames.reduce(
			(acc, instrumentTuningName) => {
				const tuning: string[] =
					instrument[instrumentTuningName as keyof typeof instrument];

				if (!Array.isArray(tuning)) {
					return acc;
				}
				const tuningString = tuning.join(" ");

				const key = `${instrumentName} - ${instrumentTuningName} [${tuningString}]`;

				return {
					...acc,
					[key]: {
						instrument: instrumentName,
						instrumentTuningName,
						tuning,
					},
				};
			},
			{} as Record<
				string,
				{ instrument: string; instrumentTuningName: string; tuning: string[] }
			>,
		);

		return { ...acc, ...dataListMap };
	},
	{} as Record<
		string,
		{ instrument: string; instrumentTuningName: string; tuning: string[] }
	>,
);
