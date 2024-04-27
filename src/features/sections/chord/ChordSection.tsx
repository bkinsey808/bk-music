"use client";

import Dashboard from "@/app/d/page";
import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { getCasedRomanNumeral } from "@/features/music/getCasedRomanNumeral";
import { getSciBySpelling } from "@/features/music/sci";

export const ChordSection = () => {
	const { getValues } = useDashboardState();
	const [chord, scale] = getValues([
		DashboardStateKey.CHORD,
		DashboardStateKey.SCALE,
	]);
	const selectedChordParts = chord;
	const selectedChordRomanNumeral = selectedChordParts[0];
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const sci = getSciBySpelling(selectedChordSpellingArray);

	return (
		<section data-title="Chord Section">
			<div>
				{getCasedRomanNumeral(selectedChordRomanNumeral, scale)} {sci?.txtCode}
			</div>
			<div>Alt Name(s): {sci?.txtAltNames}</div>
		</section>
	);
};
