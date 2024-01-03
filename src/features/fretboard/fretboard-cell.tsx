import { type VariantProps, cva } from "class-variance-authority";

import { getScaleDegree } from "@/helpers/get-scale-degree";
import { isNoteInScale } from "@/helpers/is-note-in-scale";
import { transposeNote } from "@/helpers/transpose-note";

interface FretboardCellProps {
	tuning: string[];
	course: number;
	fret: number;
	scaleNumbers: number[];
	scale: string;
	keyNote: string;
}

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
			style={{
				"--color-cell-background": noteInScale
					? "var(--color-cell-background-in-scale)"
					: "var(--color-cell-background)",
			}}
			className={`
				relative 
				border-2 
				border-solid 
				bg-[var(--color-cell-background)] 
				pl-1 
				pr-12 
				text-right 
				text-4xl
			`}
		>
			{transposedNote}
			<br />
			{scaleDegree}
			{fret === 0 && (
				<>
					<div
						className={`
							absolute 
							bottom-0 
							left-1 
							top-0 
							flex 
							w-4 
							flex-col 
							justify-center 
							[&>button]:text-base
						`}
					>
						<button>+</button>
						<button>-</button>
					</div>
					<div
						className={`
						absolute 
						bottom-0 
						right-3 
						top-0 
						flex 
						w-1 
						flex-col 
						justify-center 
						[&>button]:text-xs 
						[&>button]:leading-tight
					`}
					>
						<button>▲</button>
						<button>▼</button>
					</div>
				</>
			)}
		</div>
	);
};
