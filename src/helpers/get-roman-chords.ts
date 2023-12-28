import * as S from "@effect/schema/Schema";
import * as Either from "effect/Either";

import { getKeys } from "./get-keys";
import { getSciNumbers } from "./get-sci-numbers";
import * as sci from "./sci.json";

const romanNumerals = [
	"I",
	"bII",
	"II",
	"bIII",
	"III",
	"IV",
	"bV",
	"V",
	"bVI",
	"VI",
	"bVII",
	"VII",
];

const SciDesc = S.struct({
	name: S.string,
	code: S.string,
	spelling: S.string,
});

const Sci = S.record(
	S.union(S.literal("3"), S.literal("4")),
	S.record(S.string, SciDesc),
);

const parseEitherResult = S.parseEither(Sci)(sci);

const parsedSci = Either.isRight(parseEitherResult)
	? parseEitherResult.right
	: undefined;

const getChordFromSlug = (chordSlug: string) => {
	const chord = ["3", "4"].includes(chordSlug[0])
		? chordSlug.slice(1)
		: chordSlug;
};

const doesChordHaveMajorThird = (chordSlug: string) => {
	const chord = ["3", "4"].includes(chordSlug[0])
		? chordSlug.slice(1)
		: chordSlug;
};
/**
 * Given a scale, what are the Roman chords? Roman chords are chords organized by scale degree and major/minor.
 * Capital Roman numerals signify major chords, lowercase signify minor chords, the presense of a minor third and absence of a major third.
 */
export const getRomanChords = (scale: string) => {
	if (!parsedSci) {
		throw new Error("sci.json is invalid");
	}

	const scaleNumbers = getSciNumbers(scale);
	const chordObjects = getKeys(parsedSci)
		.flatMap((numNotesInChord) =>
			getKeys(parsedSci[numNotesInChord]).map((chordSlug) => {
				const chordObj = parsedSci[numNotesInChord][chordSlug];
				return {
					[chordSlug]: {
						...chordObj,
						numNotesInChord,
						chordNumbers: getSciNumbers(chordObj.spelling),
					},
				};
			}),
		)
		// spread the array of objects into a single object
		.reduce((acc, curr) => ({ ...acc, ...curr }), {});

	const results = scaleNumbers.map((scaleNumber, index) => {
		const modeNumbers = [
			...scaleNumbers.slice(index),
			...scaleNumbers.slice(0, index),
		]
			// next subtract the first scale number from all the scale numbers
			.map((innerScaleNumber) => (innerScaleNumber - scaleNumber + 12) % 12);

		const romanChords = getKeys(chordObjects)
			.filter((chordSlug) =>
				chordObjects[chordSlug].chordNumbers.every((chordNumber) =>
					modeNumbers.includes(chordNumber),
				),
			)
			.map((chordSlug) => {
				const chordObject = chordObjects[chordSlug];
				const spellingArray = chordObject.spelling.split("-");
				const hasMajorThird = spellingArray.includes("3");
				const hasMinorThird = spellingArray.includes("b3");

				return {
					chordSlug,
					chordSpelling: chordObjects[chordSlug].spelling,
					chordCode: chordObjects[chordSlug].code,
					numNotesInChord: chordObjects[chordSlug].numNotesInChord,
					isLowerCase: hasMinorThird && !hasMajorThird,
					romanNumberCode: "",
				};
			});

		return {
			romanChords,
			scaleNumber,
			modeNumbers,
		};
	});

	console.log(JSON.stringify(results, null, 2));
};
