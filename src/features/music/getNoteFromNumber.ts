const notesAndFlatNotes = [
	"C",
	"Db",
	"D",
	"Eb",
	"E",
	"F",
	"Gb",
	"G",
	"Ab",
	"A",
	"Bb",
	"B",
];

const notesAndSharpNotes = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B",
];

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
