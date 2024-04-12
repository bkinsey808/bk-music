import { ScaleDegreeChord } from "./scale-degree-chord";
import { DashboardProps } from "@/app/d/dashboard-url";
import { getScaleIndexFromRomanNumeral } from "@/features/music/get-roman-numerals";
import { getChords } from "@/features/scale-degrees/helpers/get-chords";

interface ScaleDegreeProps {
	scale: string;
	romanNumeral: string;
	scaleIndex: number;
	dashboardProps: DashboardProps;
}

export const ScaleDegree = ({
	scale,
	romanNumeral,
	scaleIndex,
	dashboardProps,
}: ScaleDegreeProps) => {
	const chords = getChords({
		scale,
		scaleIndex,
	});

	const selectedChord = dashboardProps.params.chord;
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
						<ScaleDegreeChord
							key={index}
							chord={chord}
							selected={selected}
							dashboardProps={dashboardProps}
						/>
					);
				})}
			</div>
		</div>
	);
};
