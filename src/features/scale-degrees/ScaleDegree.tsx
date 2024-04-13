import { romanNumerals } from "../music/romanNumerals";
import { ScaleDegreeChord } from "./ScaleDegreeChord";
import { DashboardProps } from "@/app/d/dashboardUrl";
// import { getScaleIndexFromRomanNumeral } from "@/features/music/getScaleIndexFromRomanNumeral";
import { getChords } from "@/features/scale-degrees/getChords";

interface ScaleDegreeProps {
	scale: string;
	romanNumeral: string;
	dashboardProps: DashboardProps;
}

export const ScaleDegree = ({
	scale,
	romanNumeral,
	dashboardProps,
}: ScaleDegreeProps) => {
	const romanNumeralIndex = romanNumerals.findIndex(
		(r) => r.toLowerCase() === romanNumeral.toLowerCase(),
	);
	const chords = getChords({
		scale,
		scaleIndex: romanNumeralIndex,
	});

	const selectedChord = dashboardProps.params.chord;
	const selectedChordParts = selectedChord.split("-");
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordRomanNumeral = selectedChordParts[0];
	const selectedChordSpelling = selectedChordSpellingArray.join("-");

	return (
		<div className="flex flex-row gap-[0.1rem]">
			<div className="min-w-[2rem]">{romanNumeral}</div>
			<div className="flex flex-row flex-wrap gap-[0.2rem]">
				{chords?.map((chord) => {
					const selected =
						chord?.sci?.txtSpelling?.replaceAll(",", "-") ===
							selectedChordSpelling &&
						romanNumeral.toLowerCase() ===
							selectedChordRomanNumeral.toLowerCase();

					return (
						<ScaleDegreeChord
							key={chord?.sci?.txtSpelling}
							sci={chord?.sci}
							selected={selected}
							dashboardProps={dashboardProps}
							romanNumeral={romanNumeral}
						/>
					);
				})}
			</div>
		</div>
	);
};
