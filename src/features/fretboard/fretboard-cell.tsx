import { type VariantProps, cva } from "class-variance-authority";

import { ZerothFretControls } from "./zeroth-fret-controls";
import { getScaleDegree } from "@/helpers/get-scale-degree";
import { isNoteInScale } from "@/helpers/is-note-in-scale";
import { transposeNote } from "@/helpers/transpose-note";

type FretboardCellProps = {
	tuning: string[];
	course: number;
	fret: number;
	scaleNumbers: number[];
	scale: string;
	keyNote: string;
};

export const FretboardCell = ({
	tuning,
	course,
	fret,
	scale,
	keyNote,
}: FretboardCellProps) => {
	const note = tuning[course];
	const transposedNote = transposeNote(note, fret);
	const scaleDegree = getScaleDegree(keyNote, transposedNote);
	const noteInScale = isNoteInScale(keyNote, scale, transposedNote);

	return (
		<div
			data-title="Fretboard cell"
			aria-label={`Fret ${fret} of course ${course} is ${transposedNote}`}
			style={{
				"--color-cell-background": noteInScale
					? "var(--color-cell-background-in-scale)"
					: "var(--color-cell-background)",
			}}
			className="relative border-2 border-solid bg-[var(--color-cell-background)] pl-1 pr-12 text-right text-4xl"
		>
			{transposedNote}
			<br />
			{scaleDegree}
			{fret === 0 && <ZerothFretControls />}
		</div>
	);
};
