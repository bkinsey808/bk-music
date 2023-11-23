import { accidentalToNumber } from "./accidental-to-number";

const letterToNumber: { [key: string]: number } = {
	C: 0,
	D: 2,
	E: 4,
	F: 5,
	G: 7,
	A: 9,
	B: 11,
};

export const letterAndAccidentalToNumber = (letterAndAccidental: string) => {
	// make sure to handle # ## b bb
	const letter = letterAndAccidental[0];
	const accidental = letterAndAccidental.slice(1);
	const letterNumber = letterToNumber[letter];
	const accidentalNumber = accidentalToNumber[accidental];
	return letterNumber + accidentalNumber;
};
