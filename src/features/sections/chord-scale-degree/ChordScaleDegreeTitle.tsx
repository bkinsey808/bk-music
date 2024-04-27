"use client";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { getNoteFromNumber } from "@/features/music/getNoteFromNumber";
import { getNoteNumber } from "@/features/music/getNoteNumber";
import { romanNumerals } from "@/features/music/romanNumerals";

export const ChordScaleDegreeTitle = () => {
	const { getValues } = useDashboardState();
	const [selectedChord, keyNote] = getValues([
		DashboardStateKey.CHORD,
		DashboardStateKey.KEY_NOTE,
	]);
	const selectedChordParts = selectedChord;
	const selectedChordRomanNumeral = selectedChordParts[0];
	const romanNumeralIndex = romanNumerals.findIndex(
		(r) => r?.toLowerCase() === selectedChordRomanNumeral?.toLowerCase(),
	);
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;
	const chordStartingNoteNumber = (keyNoteNumber + romanNumeralIndex) % 12;
	const chordStartingNote = getNoteFromNumber({
		noteNumber: chordStartingNoteNumber,
		includeOctave: false,
	});

	return (
		<span>
			Chord Scale Degree: {selectedChordRomanNumeral?.replace("b", "♭")} (
			{chordStartingNote.replace("b", "♭")})
		</span>
	);
};
