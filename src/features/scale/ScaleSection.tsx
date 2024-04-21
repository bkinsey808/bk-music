"use client";

import { useDashboardState } from "@/app/d/useDashboardState";

export const ScaleSection = () => {
	const { keyScale } = useDashboardState();
	const keyNote = keyScale.split("-")[0];

	// scale is all of the elements after the first
	const scale = keyScale.split("-").slice(1).join("-");

	return (
		<section data-title="Scale Section">
			<h2>Scale</h2>
			<div className="flex flex-col">
				Key: {keyNote}
				<br />
				Scale: {scale}
			</div>
		</section>
	);
};
