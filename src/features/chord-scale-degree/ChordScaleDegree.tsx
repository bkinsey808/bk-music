"use client";

import Link from "next/link";

import { getNoteFromNumber } from "../music/getNoteFromNumber";
import { getNoteNumber } from "../music/getNoteNumber";
import { romanNumerals } from "../music/romanNumerals";
import { useDashboardState } from "@/app/d/useDashboardState";

export const ChordScaleDegree = ({
	chord,
	inKeyScale,
	selected,
	romanNumeral,
	chordCode,
}: {
	chord: string;
	inKeyScale: boolean;
	selected: boolean;
	romanNumeral: string;
	chordCode: string | undefined;
}) => {
	const { keyScale, setChord, getChordUrl } = useDashboardState();

	const romanNumeralIndex = romanNumerals.findIndex(
		(r) => r.toLowerCase() === romanNumeral.toLowerCase(),
	);
	const keyNote = keyScale.split("-")[0];
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;
	const chordStartingNoteNumber = (keyNoteNumber + romanNumeralIndex) % 12;

	const chordStartingNote = getNoteFromNumber({
		noteNumber: chordStartingNoteNumber,
		includeOctave: false,
	});

	const url = getChordUrl(chord);

	return (
		<Link
			data-title="Chord Scale Degree"
			data-in-key-scale={inKeyScale}
			href={url}
			className="mr-[-0.1rem] break-all border-[0.1rem] border-current p-[0.4rem] text-center [&[data-in-key-scale='true']]:bg-[var(--color-cell-background-in-scale)]"
			onClick={(e) => {
				e.preventDefault();
				setChord(chord);
				return false;
			}}
		>
			<div
				data-selected={selected}
				className="h-full border-[0.1rem] border-transparent [&[data-selected='true']]:border-current"
			>
				<div>{romanNumeral.replace("b", "♭")}</div>
				<div>({chordStartingNote.replace("b", "♭")})</div>
				{chordCode}
			</div>
		</Link>
	);
};
