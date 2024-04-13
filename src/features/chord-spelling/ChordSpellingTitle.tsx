import { DashboardProps } from "@/app/d/dashboardUrl";

export const ChordSpellingTitle = ({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	const selectedChordParts = dashboardProps.params.chord.split("-");
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordSpelling = selectedChordSpellingArray.join(" ");

	return <span>Chord Spelling: {selectedChordSpelling.replace("b", "♭")}</span>;
};
