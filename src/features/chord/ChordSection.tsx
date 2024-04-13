import { DashboardProps } from "@/app/d/dashboardUrl";
import { getCasedRomanNumeral } from "@/features/music/getCasedRomanNumeral";
import { getSciBySpelling } from "@/features/music/sci";

export const ChordSection = ({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	const selectedChordParts = dashboardProps.params.chord.split("-");
	const selectedChordRomanNumeral = selectedChordParts[0];
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordSpelling = selectedChordSpellingArray.join("-");
	const sci = getSciBySpelling(selectedChordSpelling);

	const { keyScale } = dashboardProps.params;

	const scale = keyScale.split("-").slice(1).join("-");

	return (
		<section data-title="Chord Section">
			<div>
				{getCasedRomanNumeral(selectedChordRomanNumeral, scale)} {sci?.txtCode}
			</div>
			<div>Alt Name(s): {sci?.txtAltNames}</div>
		</section>
	);
};
