import { DashboardProps } from "@/app/d/dashboard-url";
import { getScaleIndexFromRomanNumeral } from "@/features/music/get-roman-numerals";
import { getSciBySpelling } from "@/features/music/sci";

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
