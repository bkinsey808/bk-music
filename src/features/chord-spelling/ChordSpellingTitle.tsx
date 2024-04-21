"use client";

import { useDashboardState } from "@/app/d/useDashboardState";

export const ChordSpellingTitle = () => {
	const { chord } = useDashboardState();
	const selectedChordParts = chord.split("-");
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordSpelling = selectedChordSpellingArray.join(" ");

	return <span>Chord Spelling: {selectedChordSpelling.replace("b", "♭")}</span>;
};
