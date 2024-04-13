import { romanNumerals } from "./romanNumerals";

export const getScaleIndexFromRomanNumeral = (romanNumeral: string) => {
	// console.log({ romanNumeral });
	if (romanNumeral === undefined) {
		console.log("undefined romanNumeral");
		console.trace();
		return undefined;
	}
	const index = romanNumerals.findIndex(
		(numeral) => numeral?.toLowerCase() === romanNumeral?.toLowerCase(),
	);

	if (index === -1) {
		return undefined;
	}

	return index;
};
