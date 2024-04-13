import { range } from "../math/range";
import { getCasedRomanNumeral } from "../music/getCasedRomanNumeral";
import { getInKeyScale } from "../music/getInKeyScale";
import { romanNumerals } from "../music/romanNumerals";
import { getSciBySpelling } from "../music/sci";
import { ChordScaleDegree } from "./ChordScaleDegree";
import { DashboardProps } from "@/app/d/dashboardUrl";

export const ChordScaleDegreeSection = ({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	const selectedChordParts = dashboardProps.params.chord.split("-");
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordSpelling = selectedChordSpellingArray.join("-");
	const sci = getSciBySpelling(selectedChordSpelling);

	const { keyScale } = dashboardProps.params;

	const scale = keyScale.split("-").slice(1).join("-");

	const casedRomanNumerals = range(0, 12).map((scaleIndex) => {
		const romanNumeral = getCasedRomanNumeral(romanNumerals[scaleIndex], scale);
		const chord = `${romanNumeral}-${selectedChordSpelling}`;

		return {
			romanNumeral,
			chord,
			selected: chord === dashboardProps.params.chord,
			inKeyScale: getInKeyScale(chord, keyScale),
		};
	});

	return (
		<section
			data-title="Chord Scale Degree Section"
			className="grid w-[calc(100%-1rem)] grid-cols-[repeat(6,1fr)]"
		>
			{casedRomanNumerals.map(
				({ selected, romanNumeral, chord, inKeyScale }) => (
					<ChordScaleDegree
						key={chord}
						chord={chord}
						inKeyScale={inKeyScale}
						selected={selected}
						romanNumeral={romanNumeral}
						chordCode={sci?.txtCode}
						dashboardProps={dashboardProps}
					/>
				),
			)}
		</section>
	);
};
