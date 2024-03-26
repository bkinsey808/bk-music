// "use client";
import { getScaleIndexFromRomanNumeral } from "@/helpers/get-roman-numerals";
import { getSciBySpelling } from "@/helpers/sci";

interface ChordProps {
	keyNote: string;
	scale: string;
	chord: string;
}

export const Chord = ({
	keyNote: _keyNote,
	scale: _scale,
	chord,
}: ChordProps) => {
	const selectedChordParts = chord.split("-");
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
