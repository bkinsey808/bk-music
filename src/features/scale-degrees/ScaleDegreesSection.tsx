"use client";

import { ScaleDegree } from "./ScaleDegree";
import { useDashboardState } from "@/app/d/useDashboardState";
import { getRomanNumerals } from "@/features/music/getRomanNumerals";

export const ScaleDegreesSection = () => {
	const { keyScale } = useDashboardState();

	// scale is all of the elements after the first
	const scale = keyScale.split("-").slice(1).join("-");

	return (
		<section
			data-title="Scale Degrees Section"
			className="flex flex-col gap-[0.5rem]"
		>
			{getRomanNumerals(scale)?.map((romanNumeral) => (
				<ScaleDegree key={romanNumeral} romanNumeral={romanNumeral} />
			))}
		</section>
	);
};
