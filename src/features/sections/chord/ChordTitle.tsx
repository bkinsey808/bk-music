"use client";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { getCasedRomanNumeral } from "@/features/music/getCasedRomanNumeral";
import { getSciBySpelling } from "@/features/music/sci";

export const ChordTitle = () => {
	const { getValues } = useDashboardState();
	const [chord, scale] = getValues([
		DashboardStateKey.CHORD,
		DashboardStateKey.SCALE,
	]);
	const selectedChordRomanNumeral = chord[0];
	const [, ...selectedChordSpellingArray] = chord;
	const sci = getSciBySpelling(selectedChordSpellingArray);

	return (
		<div>
			Chord
			{chord
				? `: ${getCasedRomanNumeral(selectedChordRomanNumeral, scale)} ${sci?.txtCode} ( ${selectedChordSpellingArray.map((spellingElement) => spellingElement.replace("b", "♭")).join(" ")} ) ${sci?.txtName}`
				: null}
		</div>
	);
};
