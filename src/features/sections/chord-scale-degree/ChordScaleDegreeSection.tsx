"use client";

import { ChordScaleDegree } from "./ChordScaleDegree";
import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { range } from "@/features/math/range";
import { degrees } from "@/features/music/degrees";
import { getCasedRomanNumeral } from "@/features/music/getCasedRomanNumeral";
import { getInKeyScale } from "@/features/music/getInKeyScale";
import { romanNumerals } from "@/features/music/romanNumerals";
import { getSciBySpelling } from "@/features/music/sci";

export const ChordScaleDegreeSection = () => {
	const { getValues } = useDashboardState();
	const [selectedChord, selectedChordScaleDegree, keyNote, scale] = getValues([
		DashboardStateKey.CHORD,
		DashboardStateKey.CHORD_SCALE_DEGREE,
		DashboardStateKey.KEY_NOTE,
		DashboardStateKey.SCALE,
	]);

	const selectedChordSpelling = selectedChord.join("-");
	const sci = getSciBySpelling(selectedChord);

	const casedRomanNumerals = range(0, 12).map((scaleIndex) => {
		const romanNumeral = getCasedRomanNumeral(romanNumerals[scaleIndex], scale);
		const chord = `${romanNumeral}-${selectedChordSpelling}`.split("-");
		const chordScaleDegree = degrees[scaleIndex];

		return {
			romanNumeral,
			chord,
			selected: chordScaleDegree === selectedChordScaleDegree,
			inKeyScale: getInKeyScale({ chordScaleDegree, chord, keyNote, scale }),
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
