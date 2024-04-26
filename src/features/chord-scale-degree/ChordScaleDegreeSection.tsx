"use client";

import { range } from "../math/range";
import { getCasedRomanNumeral } from "../music/getCasedRomanNumeral";
import { getInKeyScale } from "../music/getInKeyScale";
import { romanNumerals } from "../music/romanNumerals";
import { getSciBySpelling } from "../music/sci";
import { ChordScaleDegree } from "./ChordScaleDegree";
import { useDashboardState } from "@/app/d/useDashboardState";

export const ChordScaleDegreeSection = () => {
	const { chord: selectedChord, keyNote, scale } = useDashboardState();

	const selectedChordParts = selectedChord;
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordSpelling = selectedChordSpellingArray.join("-");
	const sci = getSciBySpelling(selectedChordSpellingArray);

	const casedRomanNumerals = range(0, 12).map((scaleIndex) => {
		const romanNumeral = getCasedRomanNumeral(romanNumerals[scaleIndex], scale);
		const chord = `${romanNumeral}-${selectedChordSpelling}`.split("-");

		return {
			romanNumeral,
			chord,
			selected: chord.join("-") === selectedChord.join("-"),
			inKeyScale: getInKeyScale(chord, keyNote, scale),
		};
	});

	return (
		<section
			data-title="Chord Scale Degree Section"
			className="grid grid-cols-[repeat(6,1fr)]"
		>
			{casedRomanNumerals.map(
				({ selected, romanNumeral, chord, inKeyScale }) => (
					<ChordScaleDegree
						key={chord.join("-")}
						chord={chord}
						inKeyScale={inKeyScale}
						selected={selected}
						romanNumeral={romanNumeral}
						chordCode={sci?.txtCode}
					/>
				),
			)}
		</section>
	);
};
