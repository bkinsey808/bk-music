"use client";

import { useDashboardState } from "@/app/d/useDashboardState";

export const KeyTitle = () => {
	const { keyNote } = useDashboardState();

	return (
		<>
			<div>Key{keyNote ? `: ` : null}</div>
			<div className="overflow-hidden text-ellipsis text-nowrap">
				{keyNote.replace("b", "♭")}
			</div>
		</>
	);
};
