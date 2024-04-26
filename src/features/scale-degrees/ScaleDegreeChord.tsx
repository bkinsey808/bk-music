"ues client";

import Link from "next/link";

import { getChords } from "./getChords";
import { useDashboardState } from "@/app/d/useDashboardState";

interface ScaleDegreeChordProps {
	sci:
		| NonNullable<NonNullable<ReturnType<typeof getChords>>[number]>["sci"]
		| undefined;
	romanNumeral: string;
}

export const ScaleDegreeChord = ({
	sci,
	romanNumeral,
}: ScaleDegreeChordProps) => {
	const { chord: selectedChord, getChordUrl, setChord } = useDashboardState();

	const newChord =
		`${romanNumeral?.toLowerCase()}-${sci?.txtSpelling?.replaceAll(",", "-")}`.split(
			"-",
		);
	const url = getChordUrl(newChord);

	const selectedChordParts = selectedChord;
	const [, ...selectedChordSpellingArray] = selectedChordParts;
	const selectedChordRomanNumeral = selectedChordParts[0];
	const selectedChordSpelling = selectedChordSpellingArray.join("-");

	const selected =
		sci?.txtSpelling?.replaceAll(",", "-") === selectedChordSpelling &&
		romanNumeral.toLowerCase() === selectedChordRomanNumeral.toLowerCase();

	return (
		<Link
			data-title="Scale Degree Chord"
			data-selected={selected}
			className="flex h-[2rem] cursor-pointer items-center rounded-full border-[0.1rem] border-transparent px-[0.4rem] [&[data-selected='true']]:border-current"
			href={url}
			onClick={(e) => {
				e.preventDefault();
				setChord(newChord);
				return false;
			}}
		>
			{sci?.txtCode}
		</Link>
	);
};
