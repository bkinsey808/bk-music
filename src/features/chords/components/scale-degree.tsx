// "use client";
import { Chord } from "./chord";
import { getChords } from "@/features/chords/helpers/get-chords";
import { getScaleIndexFromRomanNumeral } from "@/helpers/get-roman-numerals";

// import { useRouter } from "next/navigation";

interface ScaleDegreeProps {
	keyNote: string;
	scale: string;
	romanNumeral: string;
	scaleIndex: number;
	chord: string;
}

export const ScaleDegree = ({
	keyNote,
	scale,
	romanNumeral,
	scaleIndex,
	chord: selectedChord,
}: ScaleDegreeProps) => {
	const chords = getChords({
		scale,
		scaleIndex,
	});

	const selectedChordParts = selectedChord.split("-");
	const selectedChordRomanNumeral = selectedChordParts[0];
	const selectedChordScaleIndex = getScaleIndexFromRomanNumeral(
		selectedChordRomanNumeral,
	);
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordSpelling = selectedChordSpellingArray.join("-");

	return (
		<div className="flex flex-row gap-[0.1rem]">
			<div className="min-w-[2rem]">{romanNumeral}</div>
			<div className="[&>button]:border-color- flex flex-row flex-wrap gap-[0.2rem] [&>button[data-selected='true']]:border-current [&>button]:h-[2rem] [&>button]:border-[0.1rem] [&>button]:border-transparent [&>button]:px-[0.2rem]">
				{chords?.map((chord, index) => {
					const selected =
						chord.chord.txtSpelling.replaceAll(",", "-") ===
							selectedChordSpelling &&
						getScaleIndexFromRomanNumeral(chord.romanNumeral) ===
							selectedChordScaleIndex;

					return <Chord key={index} chord={chord} selected={selected} />;
				})}
			</div>
		</div>
	);
};
