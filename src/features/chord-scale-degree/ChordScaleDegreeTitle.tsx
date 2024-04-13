import { getNoteFromNumber } from "../music/getNoteFromNumber";
import { getNoteNumber } from "../music/getNoteNumber";
import { romanNumerals } from "../music/romanNumerals";
import { DashboardProps } from "@/app/d/dashboardUrl";

export const ChordScaleDegreeTitle = ({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	const selectedChordParts = dashboardProps.params.chord.split("-");
	const selectedChordRomanNumeral = selectedChordParts[0];
	const romanNumeralIndex = romanNumerals.findIndex(
		(r) => r.toLowerCase() === selectedChordRomanNumeral.toLowerCase(),
	);
	const keyNote = dashboardProps.params.keyScale.split("-")[0];
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;
	const chordStartingNoteNumber = (keyNoteNumber + romanNumeralIndex) % 12;
	const chordStartingNote = getNoteFromNumber({
		noteNumber: chordStartingNoteNumber,
		includeOctave: false,
	});

	return (
		<span>
			Chord Scale Degree: {selectedChordRomanNumeral.replace("b", "♭")} (
			{chordStartingNote.replace("b", "♭")})
		</span>
	);
};
