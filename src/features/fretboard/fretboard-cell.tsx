import { css } from "@kuma-ui/core";

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
			className={css`
				border: 1px solid;
				position: relative;
				font-size: 2rem;
				padding-right: 1.2rem;
				padding-left: 1rem;
				text-align: right;
				background-color: var(--color-cell-background);
			`}
		>
			{transposedNote}
			<br />
			{scaleDegree}
			{fret === 0 && (
				<>
					<div
						className={css`
							position: absolute;
							top: 0;
							bottom: 0;
							left: 0.1rem;
							display: flex;
							flex-direction: column;
							justify-content: center;
							width: 1rem;

							button {
								font-size: 1rem !important;
								line-height: 0.7rem;
							}
						`}
					>
						<button>+</button>
						<button>-</button>
					</div>
					<div
						className={css`
							position: absolute;
							top: 0;
							bottom: 0;
							right: 0.1rem;
							display: flex;
							flex-direction: column;
							justify-content: center;
							width: 1rem;

							button {
								font-size: 0.6rem !important;
							}
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
