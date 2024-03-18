import * as S from "@effect/schema/Schema";

import { accidentalToNumber } from "./accidental-to-number";

const Letter = S.literal("C", "D", "E", "F", "G", "A", "B");

// get the typescript type from Letter
// type Letter = Letter.

const letterToNumber = {
	C: 0,
	D: 2,
	E: 4,
	F: 5,
	G: 7,
	A: 9,
	B: 11,
} as const;

// const LetterAndAccidentalTemplateLiteral = S.templateLiteral(S.keyof(Letter));

type LetterAndAccidental =
	`${keyof typeof letterToNumber}${keyof typeof accidentalToNumber}`;

export const letterAndAccidentalToNumber = (
	letterAndAccidental: LetterAndAccidental,
) => {
	// make sure to handle # ## b bb
	const letter = letterAndAccidental[0] as keyof typeof letterToNumber;
	const accidental = letterAndAccidental.slice(
		1,
	) as keyof typeof accidentalToNumber;
	const letterNumber = letterToNumber[letter];
	const accidentalNumber = accidentalToNumber[accidental];
	return (letterNumber + accidentalNumber) % 12;
};
