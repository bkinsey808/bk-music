import { getScaleDegree } from "@/features/music/get-scale-degree";
import { isNoteInScale } from "@/features/music/is-note-in-scale";
import { transposeNote } from "@/features/music/transpose-note";

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
			className="grid grid-cols-[2rem_1fr_2rem] border-2 border-solid bg-[var(--color-cell-background)]"
		>
			{fret === 0 && (
				<div className="flex w-4 flex-col justify-center [&>button]:text-base">
					<button aria-label="Add course">+</button>
					<button aria-label="Remove Course">-</button>
				</div>
			)}
			<div className="col-[2] flex justify-center text-center">
				{transposedNote}
				<br />
				{scaleDegree}
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
