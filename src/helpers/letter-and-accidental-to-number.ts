import { accidentalToNumber } from "./accidental-to-number";

const letterToNumber = {
	C: 0,
	D: 2,
	E: 4,
	F: 5,
	G: 7,
	A: 9,
	B: 11,
} as const;

export const letterAndAccidentalToNumber = (letterAndAccidental: string) => {
	// make sure to handle # ## b bb
	const letter = letterAndAccidental[0] as keyof typeof letterToNumber;
	const accidental = letterAndAccidental.slice(
		1,
	) as keyof typeof accidentalToNumber;
	const letterNumber = letterToNumber[letter];
	const accidentalNumber = accidentalToNumber[accidental];
	return (letterNumber + accidentalNumber) % 12;
};
