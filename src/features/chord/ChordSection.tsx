"use client";

import { useDashboardState } from "@/app/d/useDashboardState";
import { getCasedRomanNumeral } from "@/features/music/getCasedRomanNumeral";
import { getSciBySpelling } from "@/features/music/sci";

export const ChordSection = () => {
	const { chord, scale } = useDashboardState();
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
