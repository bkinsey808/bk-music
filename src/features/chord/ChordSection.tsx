"use client";

import { useDashboardState } from "@/app/d/useDashboardState";
import { getCasedRomanNumeral } from "@/features/music/getCasedRomanNumeral";
import { getSciBySpelling } from "@/features/music/sci";

export const ChordSection = () => {
	const { chord, keyScale } = useDashboardState();
	const selectedChordParts = chord.split("-");
	const selectedChordRomanNumeral = selectedChordParts[0];
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordSpelling = selectedChordSpellingArray.join("-");
	const sci = getSciBySpelling(selectedChordSpelling);

	const scale = keyScale.split("-").slice(1).join("-");

	return (
		<section data-title="Chord Section">
			<div>
				{getCasedRomanNumeral(selectedChordRomanNumeral, scale)} {sci?.txtCode}
			</div>
			<div>Alt Name(s): {sci?.txtAltNames}</div>
		</section>
	);
};
