"use client";

import Link from "next/link";

import {
	Chord,
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { getNoteFromNumber } from "@/features/music/getNoteFromNumber";
import { getNoteNumber } from "@/features/music/getNoteNumber";
import { romanNumerals } from "@/features/music/romanNumerals";

export const ChordScaleDegree = ({
	chord,
	inKeyScale,
	selected,
	romanNumeral,
	chordCode,
}: {
	chord: Chord;
	inKeyScale: boolean;
	selected: boolean;
	romanNumeral: string;
	chordCode: string | undefined;
}) => {
	const { getValue, setValue, getUrl } = useDashboardState();

	const romanNumeralIndex = romanNumerals.findIndex(
		(r) => r.toLowerCase() === romanNumeral.toLowerCase(),
	);
	const keyNote = getValue(DashboardStateKey.KEY_NOTE);
	const keyNoteNumber = getNoteNumber(keyNote) ?? 0;
	const chordStartingNoteNumber = (keyNoteNumber + romanNumeralIndex) % 12;

	const chordStartingNote = getNoteFromNumber({
		noteNumber: chordStartingNoteNumber,
		includeOctave: false,
	});

	const url = getUrl(DashboardStateKey.CHORD, chord);

	return (
		<Link
			data-title="Chord Scale Degree"
			data-in-key-scale={inKeyScale}
			href={url}
			className="mr-[-0.1rem] break-all border-[0.1rem] border-current p-[0.4rem] text-center [&[data-in-key-scale='true']]:bg-[var(--color-cell-background-in-scale)]"
			onClick={(e) => {
				e.preventDefault();
				setValue(DashboardStateKey.CHORD, chord);
				return false;
			}}
		>
			<div
				data-selected={selected}
				className="h-full rounded-full border-[0.1rem] border-transparent [&[data-selected='true']]:border-current"
			>
				<div>{romanNumeral.replace("b", "♭")}</div>
				<div>({chordStartingNote.replace("b", "♭")})</div>
				{chordCode}
			</div>
		</Link>
	);
};
