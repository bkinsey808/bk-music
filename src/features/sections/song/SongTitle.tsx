"use client";

import { DashboardStateKey } from "@/app/d/enums";
import { useDashboardState } from "@/app/d/useDashboardState";

export const SongTitle = () => {
	const { getValue } = useDashboardState();
	const song = getValue(DashboardStateKey.SONG_NAME);

	return (
		<>
			<div>Song{song ? `: ` : null}</div>
			<div className="overflow-hidden text-ellipsis text-nowrap">{song}</div>
		</>
	);
};
