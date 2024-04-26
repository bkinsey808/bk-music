import { getRomanNumerals } from "./getRomanNumerals";
import { useDashboardState } from "@/app/d/useDashboardState";

export const getCasedRomanNumeral = (
	romanNumeral: string,
	scale: ReturnType<typeof useDashboardState>["scale"],
) => {
	const romanNumerals = getRomanNumerals(scale);
	const foundRomanNumeral = romanNumerals.find(
		(rn) => rn.toLowerCase() === romanNumeral?.toLowerCase(),
	);

	if (foundRomanNumeral) {
		return foundRomanNumeral;
	}

	return romanNumeral?.toUpperCase().replace("B", "b");
};
