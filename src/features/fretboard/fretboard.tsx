import { FretboardCell } from "./fretboard-cell";
import { getSciNumbers } from "@/helpers/get-sci-numbers";
import { range } from "@/helpers/range";

type FretboardProps = {
	keyNote: string;
	scale: string;
};

export const Fretboard = ({ keyNote, scale }: FretboardProps) => {
	const tuning = ["G4", "C4", "E4", "A4"];
	const maxFrets = 12;
	const scaleNumbers = getSciNumbers(scale, keyNote);

	return (
		<section>
			<h2>Fretboard</h2>
			<div
				style={{
					"--max-frets": maxFrets,
					"--courses": tuning.length,
				}}
				className={`
					grid 
					grid-flow-col
					grid-cols-[repeat(var(--courses),1fr)_1rem]
					grid-rows-[1fr_0.25rem_repeat(calc(var(--max-frets)-1),1fr)]
					gap-[0.25rem]
				`}
			>
				<div
					// zeroth fret
					className={`
						col-span-full
						row-[2]
						bg-[hsl(var(--background))]
					`}
				></div>

				<button
					autoFocus={true}
					className={`
						col-start-[-2]
						row-start-1
						ml-[0.3rem]
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
							className={` 
								col-[var(--course)]
								row-[var(--fret)]
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
