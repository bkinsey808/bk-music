"use client";

import { getRomanNumerals } from "../music/getRomanNumerals";
import { useDashboardState } from "@/app/d/useDashboardState";

export const ScaleDegreesTitle = () => {
	const { scale } = useDashboardState();

	return (
		<>
			Scale Degrees{scale.length ? `: ` : null}
			{getRomanNumerals(scale).map((romanNumeral) => {
				return <div key={romanNumeral}>{romanNumeral}</div>;
			})}
		</>
	);
};
