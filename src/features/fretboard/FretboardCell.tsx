"use client";

import { useDashboardState } from "@/app/d/useDashboardState";
import { getScaleDegree } from "@/features/music/getScaleDegree";
import { isCellInPosition } from "@/features/music/isCellInPosition";
import { isNoteInScale } from "@/features/music/isNoteInScale";
import { transposeNote } from "@/features/music/transposeNote";

type FretboardCellProps = {
	course: number;
	fret: number;
};

export const FretboardCell = ({ course, fret }: FretboardCellProps) => {
	const { keyNote, scale, tuning, position } = useDashboardState();
	const tuningArray = tuning.split("-");

	const openNote = tuningArray[course];
	const note = transposeNote(openNote, fret);
	const scaleDegree = getScaleDegree(keyNote, note);

	const noteInScale = isNoteInScale(keyNote, scale, note);
	const noteInPosition = isCellInPosition({ position, fret, course });

	return (
		<div
			data-title={`Fretboard Cell - fret ${fret} of course ${course} is ${note}`}
			data-in-scale={noteInScale}
			data-in-position={noteInPosition}
			className="grid grid-cols-[2rem_1fr_2rem] border-[0.2rem] border-solid bg-[var(--color-cell-background)] [&[data-in-scale='true']]:bg-[var(--color-cell-background-in-scale)] "
		>
			{fret === 0 && (
				<div className="flex w-4 flex-col justify-center [&>button]:text-base">
					<button aria-label="Add course">+</button>
					<button aria-label="Remove Course">-</button>
				</div>
			)}
			<div className="col-[2] flex justify-center rounded-full border-[0.3rem] border-transparent text-center [[data-in-position='true']>&]:border-current">
				{note?.replace("b", "♭")}
				<br />
				{scaleDegree?.replace("b", "♭")}
			</div>
			{fret === 0 && (
				<div className="ml-auto flex flex-col justify-center [&>button]:text-xs">
					<button aria-label="Add half step">▲</button>
					<button aria-label="Remove half step">▼</button>
				</div>
			)}
		</div>
	);
};
