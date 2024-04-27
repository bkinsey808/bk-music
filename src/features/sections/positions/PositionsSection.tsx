"use client";

import { Position } from "./Position";
import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { getPositions } from "@/features/music/getPositions";

export function Positions() {
	const { getValue } = useDashboardState();
	const chord = getValue(DashboardStateKey.CHORD);
	const keyNote = getValue(DashboardStateKey.KEY_NOTE);
	const tuning = getValue(DashboardStateKey.TUNING);

	const PositionsSection = getPositions({
		chord,
		keyNote,
		tuning,
		maxFret: 12,
		maxFretSpan: 4,
		maxMuted: 1,
	});

	return (
		<section
			data-title="Positions Section"
			className="flex flex-wrap gap-x-[1rem]"
		>
			{PositionsSection.map((position) => (
				<Position key={position} position={position} />
			))}
		</section>
	);
}