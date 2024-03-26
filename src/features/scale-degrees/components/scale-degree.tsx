// "use client";
import { ScaleDegreeChord } from "./scale-degree-chord";
import { getChords } from "@/features/scale-degrees/helpers/get-chords";
import { getScaleIndexFromRomanNumeral } from "@/helpers/get-roman-numerals";

interface ScaleDegreeProps {
	keyNote: string;
	scale: string;
	romanNumeral: string;
	scaleIndex: number;
	chord: string;
}

export const ScaleDegree = ({
	keyNote: _keyNote,
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
			<div className="flex flex-row flex-wrap gap-[0.2rem] [&>a[data-selected='true']]:border-current [&>a]:flex [&>a]:h-[2rem] [&>a]:items-center [&>a]:border-[0.1rem] [&>a]:border-transparent [&>a]:px-[0.2rem]">
				{chords?.map((chord, index) => {
					const selected =
						chord?.chord?.txtSpelling?.replaceAll(",", "-") ===
							selectedChordSpelling &&
						getScaleIndexFromRomanNumeral(chord.romanNumeral) ===
							selectedChordScaleIndex;

					return (
						<ScaleDegreeChord key={index} chord={chord} selected={selected} />
					);
				})}
			</div>
		</div>
	);
};
