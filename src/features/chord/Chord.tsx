import { getInKeyScale } from "../music/getInKeyScale";
import { DashboardProps } from "@/app/d/dashboardUrl";
import { range } from "@/features/math/range";
import { getCasedRomanNumeral } from "@/features/music/getCasedRomanNumeral";
import { romanNumerals } from "@/features/music/romanNumerals";
import { getSciBySpelling } from "@/features/music/sci";

export const Chord = ({
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
		<section data-title="Chord">
			<div className="grid w-[95%] auto-cols-fr grid-flow-col">
				{casedRomanNumerals.map(
					({ selected, romanNumeral, chord, inKeyScale }) => (
						<div
							key={chord}
							data-in-key-scale={inKeyScale}
							className="mr-[-0.1rem] break-all border-[0.1rem] border-current p-[0.4rem] text-center [&[data-in-key-scale='true']]:bg-[var(--color-cell-background-in-scale)]"
						>
							<div
								data-selected={selected}
								className="h-full border-[0.1rem] border-transparent [&[data-selected='true']]:border-current"
							>
								<div>{romanNumeral}</div>
								{sci?.txtCode}
							</div>
						</div>
					),
				)}
			</div>
			<div>
				{getCasedRomanNumeral(selectedChordRomanNumeral, scale)} {sci?.txtCode}
			</div>
			<div>Alt Name(s): {sci?.txtAltNames}</div>
		</section>
	);
};
