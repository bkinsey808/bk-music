"use client";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";

export const InstrumentTitle = () => {
	const { getValue } = useDashboardState();
	const instrument = getValue(DashboardStateKey.INSTRUMENT);

	return (
		<>
			<div>Instrument{instrument ? `: ` : null}</div>
			<div className="overflow-hidden text-ellipsis text-nowrap">
				{instrument}
			</div>
		</>
	);
};
