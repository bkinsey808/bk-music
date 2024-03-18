"use client";

import { getChords } from "../helpers/get-chords";
import { useDashboardURL } from "@/app/dashboard/useDashboardURL";
import { getScaleIndexFromRomanNumeral } from "@/helpers/get-roman-numerals";

interface ChordProps {
	chord: NonNullable<ReturnType<typeof getChords>>[number];
	selected: boolean;
}

export const Chord = ({ chord, selected }: ChordProps) => {
	const setURL = useDashboardURL();
	return (
		<button
			data-selected={selected}
			onClick={() => {
				setURL(
					"chord",
					`${chord.romanNumeral.toLowerCase()}-${chord.chord.txtSpelling.replaceAll(
						",",
						"-",
					)}`,
				);
			}}
		>
			{chord.chord.txtCode}
		</button>
	);
};
0;
