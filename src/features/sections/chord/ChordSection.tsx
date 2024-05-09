"use client";

import Link from "next/link";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { degrees } from "@/features/music/degrees";
import { getCasedRomanNumeral } from "@/features/music/getCasedRomanNumeral";
import { getNoteFromNumber } from "@/features/music/getNoteFromNumber";
import { getNoteNumber } from "@/features/music/getNoteNumber";
import { getScaleIndexFromRomanNumeral } from "@/features/music/getScaleIndexFromRomanNumeral";
import { romanNumerals } from "@/features/music/romanNumerals";
import { getSciBySpelling } from "@/features/music/sci";

export const ChordSection = () => {
	const { getValues, toggleChordDegree } = useDashboardState();
	const [chord, scale, keyNote] = getValues([
		DashboardStateKey.CHORD,
		DashboardStateKey.SCALE,
		DashboardStateKey.KEY_NOTE,
	]);
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;

	const [chordRomanNumeral, ...chordSpelling] = chord;
	const sci = getSciBySpelling(chordSpelling);

	const scaleIndex = getScaleIndexFromRomanNumeral(chordRomanNumeral) ?? 0;

	return (
		<section data-title="Chord Section">
			<div className="grid grid-cols-[repeat(6,1fr)]">
				{degrees.map((chordDegree, index) => {
					const noteNumber = (keyNoteNumber + scaleIndex + index) % 12;
					const note = getNoteFromNumber({
						noteNumber,
						includeOctave: false,
					}).replace("b", "♭");

					const degreeInChord = chordSpelling.includes(chordDegree);
					const scaleNumber = (scaleIndex + index) % 12;
					const scaleDegree = degrees[scaleNumber];

					const degreeInScale =
						scale.includes(scaleDegree) || scaleDegree === "1";

					const Component = index > 0 ? Link : "div";

					const romanNumeral = getCasedRomanNumeral(
						romanNumerals[scaleNumber],
						scale,
					).replace("b", "♭");

					return (
						<Component
							key={chordDegree}
							data-in-scale={degreeInScale}
							data-title="Chord Degree"
							className="mr-[-0.1rem] break-all border-[0.1rem] border-current p-[0.4rem] text-center first:bg-[var(--color-cell-background-in-scale)]
              [&[data-in-scale='true']]:bg-[var(--color-cell-background-in-scale)]"
							href="#"
							onClick={(e) => {
								e.preventDefault();

								if (index > 0) {
									toggleChordDegree(chordDegree);
								}

								return false;
							}}
						>
							<div
								data-selected={degreeInChord}
								className="h-full rounded-full border-[0.1rem] border-transparent [&[data-selected='true']]:border-current"
							>
								<div>{chordDegree.replace("b", "♭")}</div>
								{note ? <div>{note}</div> : null}
								<div>{romanNumeral}</div>
							</div>
						</Component>
					);
				})}
			</div>
			<div className="text-sm font-thin italic">{sci?.txtAltNames}</div>
		</section>
	);
};
