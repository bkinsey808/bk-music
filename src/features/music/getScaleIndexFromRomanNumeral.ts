import { romanNumerals } from "./romanNumerals";

export const getScaleIndexFromRomanNumeral = (romanNumeral: string) => {
	const index = romanNumerals.findIndex(
		(numeral) => numeral.toLowerCase() === romanNumeral.toLowerCase(),
	);

	if (index === -1) {
		return undefined;
	}

	return index;
};
