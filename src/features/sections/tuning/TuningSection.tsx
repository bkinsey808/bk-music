"use client";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { getKeys } from "@/features/global/getKeys";
import * as tunings from "@/features/music/tunings.json";

export const TuningSection = () => {
	const { getValue, setValue } = useDashboardState();
	const instrument = getValue(DashboardStateKey.INSTRUMENT);
	const instrumentTuningsMap = tunings[instrument as keyof typeof tunings];
	const instrumentTuningNames: string[] = getKeys(instrumentTuningsMap);

	return (
		<section data-title="Tuning Section">
			<div className="grid grid-cols-[repeat(2,1fr)]">
				{instrumentTuningNames.map((instrumentTuningName) => {
					const tuning = instrumentTuningsMap[
						instrumentTuningName as keyof typeof instrumentTuningsMap
					] as string[];

					return (
						<button
							key={instrumentTuningName}
							className="mr-[-0.1rem] h-full border-[0.1rem] border-current p-[0.6rem] text-center"
							onClick={() => {
								setValue(
									DashboardStateKey.INSTRUMENT_TUNING,
									instrumentTuningName,
								);
								setValue(DashboardStateKey.TUNING, tuning);
							}}
						>
							<div
								data-selected={
									instrumentTuningName ===
									getValue(DashboardStateKey.INSTRUMENT_TUNING)
								}
								className="w-full rounded-full border-[0.1rem] border-transparent py-[0.4rem] text-center [&[data-selected='true']]:border-current"
							>
								<div>{instrumentTuningName}</div>
								<div>{tuning}</div>
							</div>
						</button>
					);
				})}
			</div>
		</section>
	);
};
