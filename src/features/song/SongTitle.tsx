"use client";

import { useDashboardState } from "@/app/d/useDashboardState";

export const SongTitle = () => {
	const { song } = useDashboardState();

	return (
		<>
			<div>Song{song ? `: ` : null}</div>
			<div className="overflow-hidden text-ellipsis text-nowrap">{song}</div>
		</>
	);
};
