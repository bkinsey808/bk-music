import { DashboardProps } from "@/app/d/dashboardUrl";
import { range } from "@/features/math/range";
import { getCasedRomanNumeral } from "@/features/music/getCasedRomanNumeral";
import { getChordNumbers } from "@/features/music/getChordNumbers";
import { getRomanNumerals } from "@/features/music/getRomanNumerals";
import { romanNumerals } from "@/features/music/romanNumerals";
// import {
// 	getRomanNumerals,
// 	getScaleIndexFromRomanNumeral,
// } from "@/features/music/get-roman-numerals";
import { getSciBySpelling } from "@/features/music/sci";

// import { getChords } from "@/features/scale-degrees/helpers/get-chords";

export const Chord = ({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	const selectedChordParts = dashboardProps.params.chord.split("-");
	const selectedChordRomanNumeral = selectedChordParts[0];
	// const _selectedChordScaleIndex = getScaleIndexFromRomanNumeral(
	// 	selectedChordRomanNumeral,
	// );
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordSpelling = selectedChordSpellingArray.join("-");
	const sci = getSciBySpelling(selectedChordSpelling);

	const { keyScale } = dashboardProps.params;
	const keyNote = keyScale.split("-")[0];

	const scale = keyScale.split("-").slice(1).join("-");
	// const romanNumerals = getRomanNumerals(scale);

	// const chordsByRomanNumeral = romanNumerals.map((romanNumeral, scaleIndex) => {
	// 	const chords = getChords({
	// 		scale,
	// 		scaleIndex,
	// 	});
	// 	const found = chords?.find(
	// 		(chord) => chord?.chord.txtSpelling === selectedChordSpelling,
	// 	);
	// 	return { found, romanNumeral };
	// });

	// console.log({
	// 	chordsByRomanNumeral: JSON.stringify(chordsByRomanNumeral, null, 2),
	// });

	const casedRomanNumerals = range(0, 11).map((scaleDegree) => {
		const romanNumeral = getCasedRomanNumeral(
			romanNumerals[scaleDegree],
			scale,
		);
		const chord = `${romanNumeral}-${selectedChordSpelling}`;
		return {
			romanNumeral,
			chord,
			chordNumbers: getChordNumbers(chord, keyNote),
		};
	});

	return (
		<section data-title="Chord">
			<div>
				{getCasedRomanNumeral(selectedChordRomanNumeral, scale)} {sci?.txtCode}
			</div>
			<div>Alt Name(s): {sci?.txtAltNames}</div>
		</section>
	);
};
0;
