import * as S from "@effect/schema/Schema";
import * as Either from "effect/Either";
import { start } from "repl";

import { getKeys } from "./get-keys";
import { getRomanNumerals } from "./get-roman-numerals";
import { getSciNumbers } from "./get-sci-numbers";
import { getSpellingFromNoteNumber } from "./get-spelling-from-note-number";
import { range } from "./range";
import * as sciList from "./sci-list.json";

// I don't understand why this manual processing seems to be needed
const sciListArray = Array.isArray(sciList)
	? sciList
	: Object.keys(sciList)
			.map((key) => sciList[key as unknown as number])
			.filter((sci) => !Array.isArray(sci) && typeof sci === "object");

const Sci = S.struct({
	id: S.number,
	txtName: S.string,
	txtCode: S.string,
	txtSpelling: S.string,
	booPrefer: S.number,
	numNote: S.number,
	numOrdering: S.number,
	numSymForms: S.number,
	numHalfStepsInRow: S.number,
	txtNumIntervalForm: S.string,
	txtAltNames: S.string,
});

type SciType = S.Schema.Type<typeof Sci>;

const x: SciType = {
	id: 1,
	txtName: "Major",
	txtCode: "M",
	txtSpelling: "1 3 5",
	booPrefer: 1,
	numNote: 3,
	numOrdering: 1,
	numSymForms: 1,
	numHalfStepsInRow: 4,
	txtNumIntervalForm: "3 4",
	txtAltNames: "Maj",
};

const SciList = S.array(Sci);

const parseEitherResult = S.decodeUnknownEither(SciList)(sciListArray);

const parsedSci = Either.isRight(parseEitherResult)
	? parseEitherResult.right
	: undefined;

const parseSciError = Either.isLeft(parseEitherResult);

export const getChords = ({
	scale,
	minNotes = 2,
	maxNotes = 4,
	scaleIndex,
	preferred = true,
}: {
	scale: string;
	minNotes?: number;
	maxNotes?: number;
	scaleIndex?: number;
	preferred?: boolean;
	keyNote?: string;
}) => {
	if (!parsedSci) {
		console.log({ parseSciError });
		// throw new Error("sci-list.json is invalid");
		return;
	}

	const scaleNumbers = getSciNumbers(scale);

	const [minIndex, maxIndex] =
		scaleIndex !== undefined
			? [scaleIndex, scaleIndex]
			: [0, scaleNumbers.length - 1];

	const romanNumerals = getRomanNumerals(scale);

	return range(minIndex, maxIndex + 1).flatMap((index) => {
		const scaleNumber = scaleNumbers[index];

		const modeNumbers = [
			...scaleNumbers.slice(index),
			...scaleNumbers.slice(0, index),
		]
			// next subtract the first scale number from all the scale numbers
			.map((innerScaleNumber) => (innerScaleNumber - scaleNumber + 12) % 12);

		const modeSpellings = modeNumbers.map((modeNumber) =>
			getSpellingFromNoteNumber(modeNumber),
		);

		const romanNumeral = romanNumerals[index];

		const chords = sciListArray
			.filter((sci) => {
				if (sci.numNote < minNotes || sci.numNote > maxNotes) {
					return false;
				}

				if (preferred && sci.booPrefer === 0) {
					return false;
				}

				const chordNumbers = getSciNumbers(sci.txtSpelling);
				const chordInScale = chordNumbers.every((chordNumber) =>
					modeNumbers.includes(chordNumber),
				);
				return chordInScale;
			})
			.map((sci) => ({ chord: sci, romanNumeral, index }));

		return chords;
	});
};
