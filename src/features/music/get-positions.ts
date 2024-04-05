import { range } from "../math/range";
import { getNoteFromNumber } from "./get-note-from-number";
import { getScaleIndexFromRomanNumeral } from "./get-roman-numerals";
import { getSciNumbers } from "./get-sci-numbers";

/** given tuning in the form of 'G4-C4-E4-E4' and keyNote in form of 'Eb' and chord in the form of i-b3-5, return an array of position arrays in the form [[2, 0, 0, 0], ...] in the order of chords sorted by smallest fret first */
export const getPositions = ({
	tuning,
	keyNote,
	chord,
	maxMuted = 0,
	maxFrets = 17,
	maxFretSpan = 5,
}: {
	tuning: string;
	keyNote: string;
	chord: string;
	maxMuted?: number;
	maxFrets?: number;
	maxFretSpan?: number;
}) => {
	const chordArray = chord.split("-");
	const scaleDegree = chordArray[0];
	const scaleIndex = getScaleIndexFromRomanNumeral(scaleDegree);
	const sci = chordArray.slice(1).join("-");

	// given the key and the chord string, get the array of notes from the chord in the form of ['A', 'C', 'E'] for example
	const chordNumbers = getSciNumbers(sci, keyNote).map(
		(chordNumber) => (chordNumber + scaleIndex) % 12,
	);
	// now convert chordNotes, which is an array of numbers, into an array of note strings
	const chordNotes = chordNumbers.map((note) =>
		getNoteFromNumber({ noteNumber: note, includeOctave: false }),
	);

	const frets = range(0, maxFrets - maxFretSpan);
	console.log(frets);

	const positions = frets.reduce((acc, fret) => {
		const positionsAtFret = getPositionsAtFret({
			fret,
			tuning,
			chordNotes,
			maxFretSpan,
			maxMuted,
		});
		return [...acc, ...positionsAtFret];
	}, [] as string[][]);

	return chordNotes;
};

const getPositionsAtFret = ({
	fret,
	tuning,
	chordNotes,
	maxFretSpan,
	maxMuted,
}: {
	fret: number;
	tuning: string;
	chordNotes: string[];
	maxFretSpan: number;
	maxMuted: number;
}) => {
	// return an array of positions at a given fret, that are within the maxFretSpan and have at most maxMuted muted strings
	// and within the given scale at the given key note.
	// a position is an array of numbers representing the fret number for each string or "course" of tuning
	// for example, if tuning is 'E4-A4-D5-G5-B5-E6' and position is barred at fret 2, the position would be [2, 2, 2, 2, 2, 2]

	return [["1", "1", "x", "1"]];
};
