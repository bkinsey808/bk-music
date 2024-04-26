"use client";

import { getNoteFromNumber } from "../music/getNoteFromNumber";
import { getNoteNumber } from "../music/getNoteNumber";
import { romanNumerals } from "../music/romanNumerals";
import { useDashboardState } from "@/app/d/useDashboardState";

export const ChordScaleDegreeTitle = () => {
	const { chord: selectedChord, keyNote } = useDashboardState();
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
