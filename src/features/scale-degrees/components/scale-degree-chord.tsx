"use client";

import Link from "next/link";

import { getChords } from "../helpers/get-chords";
import { useDashboardURL } from "@/app/d/use-dashboard-url";

interface ScaleDegreeChordProps {
	chord: NonNullable<ReturnType<typeof getChords>>[number];
	selected: boolean;
}

export const ScaleDegreeChord = ({
	chord,
	selected,
}: ScaleDegreeChordProps) => {
	const { getURL } = useDashboardURL();
	const url = getURL(
		"chord",
		`${chord?.romanNumeral?.toLowerCase()}-${chord?.chord?.txtSpelling.replaceAll(
			",",
			"-",
		)}`,
	);
	return (
		<Link data-selected={selected} href={url}>
			{chord?.chord?.txtCode}
		</Link>
	);
};
0;
