"use client";

import { Position } from "./Position";
import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { getPositions } from "@/features/music/getPositions";

export const PositionsSection = () => {
	const { getValues } = useDashboardState();
	const [chord, keyNote, tuning, maxFrets] = getValues([
		DashboardStateKey.CHORD,
		DashboardStateKey.KEY_NOTE,
		DashboardStateKey.TUNING,
		DashboardStateKey.MAX_FRETS,
	]);

	const positions = getPositions({
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
			{positions?.map((position) => (
				<Position key={position.join("-")} position={position} />
			))}
		</section>
	);
};
