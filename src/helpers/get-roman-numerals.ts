import { getSciNumbers } from "./get-sci-numbers";
import { getSpellingFromNoteNumber } from "./get-spelling-from-note-number";

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

export const getScaleIndexFromRomanNumeral = (romanNumeral: string) =>
	romanNumerals.findIndex(
		(numeral) => numeral.toLowerCase() === romanNumeral.toLowerCase(),
	);

export const getRomanNumerals = (scale: string) => {
	const scaleNumbers = getSciNumbers(scale);

	return scaleNumbers.map((scaleNumber, index) => {
		const modeNumbers = [
			...scaleNumbers.slice(index),
			...scaleNumbers.slice(0, index),
		]
			// next subtract the first scale number from all the scale numbers
			.map((innerScaleNumber) => (innerScaleNumber - scaleNumber + 12) % 12);

		const modeSpellings = modeNumbers.map((modeNumber) =>
			getSpellingFromNoteNumber(modeNumber),
		);

		const hasMajorThird = modeSpellings.includes("3");
		const hasMinorThird = modeSpellings.includes("b3");
		const isLowerCase = hasMinorThird && !hasMajorThird;

		return isLowerCase
			? romanNumerals[scaleNumber].toLowerCase()
			: romanNumerals[scaleNumber];
	});
};
