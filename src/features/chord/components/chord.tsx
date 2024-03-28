import { DashboardProps } from "@/app/d/[tuning]/[keyScale]/[chord]/page";
import { getScaleIndexFromRomanNumeral } from "@/helpers/get-roman-numerals";
import { getSciBySpelling } from "@/helpers/sci";

export const Chord = ({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	const selectedChordParts = dashboardProps.params.chord.split("-");
	const selectedChordRomanNumeral = selectedChordParts[0];
	const _selectedChordScaleIndex = getScaleIndexFromRomanNumeral(
		selectedChordRomanNumeral,
	);
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordSpelling = selectedChordSpellingArray.join("-");
	const sci = getSciBySpelling(selectedChordSpelling);

	return <section data-title="Chord">Chord: {sci?.txtName}</section>;
};
0;
