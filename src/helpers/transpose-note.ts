import { getNoteNumber } from "./get-note-number";

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

const getNote = (noteNumber: number, preferFlats = true) => {
	const octave = Math.floor(noteNumber / 12);
	const letterAndAccidentalNumber = noteNumber % 12;

	const letterAndAccidental = preferFlats
		? notesAndFlatNotes[letterAndAccidentalNumber]
		: notesAndSharpNotes[letterAndAccidentalNumber];
	return letterAndAccidental + octave;
};

/** notes can take the form of C#4 or Db4, etc */
export const transposeNote = (note: string, interval: number) => {
	const noteNumber = getNoteNumber(note);

	if (noteNumber === undefined) {
		return undefined;
	}

	const newNoteNumber = noteNumber + interval;
	return getNote(newNoteNumber, !note.includes("#"));
};
