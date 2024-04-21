"use client";

import { Position } from "./Position";
import { useDashboardState } from "@/app/d/useDashboardState";
import { getPositions } from "@/features/music/getPositions";

export function Positions() {
	const { chord, keyScale, tuning } = useDashboardState();
	const PositionsSection = getPositions({
		chord,
		keyNote: keyScale.split("-")[0],
		tuning,
		maxFret: 12,
		maxFretSpan: 4,
		maxMuted: 1,
	});
	return (
		<section
			data-title="Positions Section"
			className="flex flex-wrap gap-x-[1rem] [&>a[data-selected='true']]:border-current [&>a]:border-[0.1rem] [&>a]:border-transparent [&>a]:px-[0.5rem]"
		>
			{PositionsSection.map((position) => (
				<Position key={position} position={position} />
			))}
		</section>
	);
}
