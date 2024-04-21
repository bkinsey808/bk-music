"use client";

import { romanNumerals } from "../music/romanNumerals";
import { ScaleDegreeChord } from "./ScaleDegreeChord";
import { useDashboardState } from "@/app/d/useDashboardState";
import { getChords } from "@/features/scale-degrees/getChords";

interface ScaleDegreeProps {
	romanNumeral: string;
}

export const ScaleDegree = ({ romanNumeral }: ScaleDegreeProps) => {
	const { keyScale } = useDashboardState();

	// scale is all of the elements after the first
	const scale = keyScale.split("-").slice(1).join("-");

	const romanNumeralIndex = romanNumerals.findIndex(
		(r) => r.toLowerCase() === romanNumeral.toLowerCase(),
	);
	const chords = getChords({
		scale,
		scaleIndex: romanNumeralIndex,
	});

	return (
		<div className="flex flex-row gap-[0.1rem]">
			<div className="min-w-[2rem]">{romanNumeral}</div>
			<div className="flex flex-row flex-wrap gap-[0.2rem]">
				{chords?.map((chord) => {
					return (
						<ScaleDegreeChord
							key={chord?.sci?.txtSpelling}
							romanNumeral={romanNumeral}
							sci={chord?.sci}
						/>
					);
				})}
			</div>
		</div>
	);
};
