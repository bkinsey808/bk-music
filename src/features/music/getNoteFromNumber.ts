import { notesAndFlatNotes, notesAndSharpNotes } from "./notes";

export const getNoteFromNumber = ({
	noteNumber,
	preferFlats = true,
	includeOctave = true,
}: {
	noteNumber: number;
	preferFlats?: boolean;
	includeOctave?: boolean;
}) => {
	const octave = Math.floor(noteNumber / 12);
	const letterAndAccidentalNumber = noteNumber % 12;

	const letterAndAccidental = preferFlats
		? notesAndFlatNotes[letterAndAccidentalNumber]
		: notesAndSharpNotes[letterAndAccidentalNumber];

	return letterAndAccidental + (includeOctave ? octave : "");
};
