import { getRomanNumerals } from "./getRomanNumerals";

export const getCasedRomanNumeral = (romanNumeral: string, scale: string) => {
	const romanNumerals = getRomanNumerals(scale);
	const foundRomanNumeral = romanNumerals.find(
		(rn) => rn.toLowerCase() === romanNumeral.toLowerCase(),
	);

	if (foundRomanNumeral) {
		return foundRomanNumeral;
	}

	return romanNumeral.toUpperCase().replace("B", "b");
};
