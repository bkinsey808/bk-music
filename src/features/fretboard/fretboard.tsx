import { css } from "@kuma-ui/core";

import { FretboardCell } from "./fretboard-cell";
import { getScaleNumbers } from "@/helpers/get-scale-numbers";
import { range } from "@/helpers/range";

type FretboardProps = {
	keyNote: string;
	scale: string;
};

export const Fretboard = ({ keyNote, scale }: FretboardProps) => {
	const tuning = ["G4", "C4", "E4", "A4"];
	const maxFrets = 12;
	const scaleNumbers = getScaleNumbers(keyNote, scale);

	return (
		<section>
			<h2>Fretboard</h2>
			<div
				style={{
					"--max-frets": maxFrets,
					"--courses": tuning.length,
				}}
				className={css`
					display: grid;
					grid-template-rows: 1fr 0.25rem repeat(
							calc(var(--max-frets) - 1),
							1fr
						);
					grid-template-columns: repeat(var(--courses), 1fr) 1rem;
					grid-gap: 1px;
					grid-auto-flow: column;
				`}
			>
				<div
					// zeroth fret
					className={css`
						grid-column: 1 / -1;
						grid-row: 2;
						background-color: black;
					`}
				></div>

				<button
					autoFocus={true}
					className={css`
						grid-row: 1;
						grid-column: -2;
						display: inline-block;
						width: 100%;
						margin-left: 0.3rem;
					`}
				>
					+
				</button>

				{range(tuning.length).map((course) =>
					range(maxFrets).map((fret) => (
						<div
							key={`${course}-${fret}`}
							style={{
								"--course": course + 1,
								"--fret": fret + (fret > 0 ? 2 : 1),
							}}
							className={css`
								grid-column: var(--course);
								grid-row: var(--fret);
							`}
						>
							<FretboardCell
								tuning={tuning}
								course={course}
								fret={fret}
								scaleNumbers={scaleNumbers}
								keyNote={keyNote}
								scale={scale}
							/>
						</div>
					)),
				)}
			</div>
		</section>
	);
};
