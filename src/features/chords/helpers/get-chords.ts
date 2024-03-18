import * as S from "@effect/schema/Schema";
import * as Either from "effect/Either";

import { SciList } from "./schema";
import { getRomanNumerals } from "@/helpers/get-roman-numerals";
import { getSciNumbers } from "@/helpers/get-sci-numbers";
import { getSpellingFromNoteNumber } from "@/helpers/get-spelling-from-note-number";
import { range } from "@/helpers/range";
import * as sciList from "@/helpers/sci-list.json";

// I don't understand why this manual processing seems to be needed
const sciListArray = Array.isArray(sciList)
	? sciList
	: Object.keys(sciList)
			.map((key) => sciList[key as unknown as number])
			.filter((sci) => !Array.isArray(sci) && typeof sci === "object");

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

	return range(minIndex, maxIndex + 1).flatMap((scaleIndex) => {
		const scaleNumber = scaleNumbers[scaleIndex];

		const modeNumbers = [
			...scaleNumbers.slice(scaleIndex),
			...scaleNumbers.slice(0, scaleIndex),
		]
			// next subtract the first scale number from all the scale numbers
			.map((innerScaleNumber) => (innerScaleNumber - scaleNumber + 12) % 12);

		const modeSpellings = modeNumbers.map((modeNumber) =>
			getSpellingFromNoteNumber(modeNumber),
		);

		const romanNumeral = romanNumerals[scaleIndex];

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
			.map((sci) => ({ chord: sci, romanNumeral, scaleIndex }));

		return chords;
	});
};
