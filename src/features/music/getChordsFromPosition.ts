import { degrees } from "./degrees";
import { getNoteNumber } from "./getNoteNumber";
import { getSciBySpelling } from "./sci";
import { Position, Tuning } from "@/app/d/useDashboardState";

export const getChordsFromPosition = ({
	tuning,
	position,
	keyNote,
}: {
	tuning: Tuning;
	position: Position;
	keyNote?: string | undefined;
}) => {
	const openNumbers = tuning.map((note) => getNoteNumber(note));
	const keyNoteNumber = getNoteNumber(keyNote);
	if (keyNoteNumber === undefined) {
		return undefined;
	}

	const noteNumbers = position.map((fret, course) => {
		const openNumber = openNumbers[course];

		if (fret === "x" || openNumber === undefined) {
			return "x";
		}

		return (openNumber + fret) % 12;
	});

	return noteNumbers
		.map((noteNumber, course) => {
			const rawNoteNumbers = noteNumbers
				.slice(course)
				.concat(noteNumbers.slice(0, course))
				.filter((noteNumber): noteNumber is number => noteNumber !== "x");

			const initialRawNoteNumber = rawNoteNumbers[0];

			const chordSpelling = Array.from(
				new Set(
					rawNoteNumbers
						.map((noteNumber) => (noteNumber - initialRawNoteNumber + 12) % 12)
						.slice(1),
				),
			)
				.filter((noteNumber) => noteNumber !== 0)
				.sort((a, b) => a - b)
				.map((noteNumber) => degrees[noteNumber])
				.filter((noteNumber) => noteNumber !== "1");

			const sci = getSciBySpelling(chordSpelling);

			const scaleDegreeNumber =
				noteNumber !== "x" ? (noteNumber - keyNoteNumber + 12) % 12 : undefined;
			const scaleDegree =
				scaleDegreeNumber !== undefined
					? degrees[scaleDegreeNumber]
					: undefined;

			return {
				rawNoteNumbers,
				chordSpelling,
				noteNumber,
				scaleDegreeNumber,
				scaleDegree,
				spelling: chordSpelling.join(","),
				name: sci?.txtName,
				preferred: sci?.booPrefer,
			};
		})
		.filter(({ noteNumber }) => noteNumber !== "x");
};
