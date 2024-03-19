// "use client";
import { getScaleIndexFromRomanNumeral } from "@/helpers/get-roman-numerals";
import { getSciBySpelling } from "@/helpers/sci";

interface ChordProps {
	keyNote: string;
	scale: string;
	chord: string;
}

export const Chord = ({ keyNote, scale, chord }: ChordProps) => {
	const selectedChordParts = chord.split("-");
	const selectedChordRomanNumeral = selectedChordParts[0];
	const selectedChordScaleIndex = getScaleIndexFromRomanNumeral(
		selectedChordRomanNumeral,
	);
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordSpelling = selectedChordSpellingArray.join("-");
	const sci = getSciBySpelling(selectedChordSpelling);

	return <section data-title="Chord">Chord: {sci?.txtName}</section>;
};
0;
