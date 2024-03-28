import { FretboardCell } from "./fretboard-cell";
import { DashboardProps } from "@/app/d/[tuning]/[keyScale]/[chord]/page";
import { getSciNumbers } from "@/helpers/get-sci-numbers";
import { range } from "@/helpers/range";

export const Fretboard = ({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	const { keyScale } = dashboardProps.params;
	const keyNote = keyScale.split("-")[0];

	// scale is all of the elements after the first
	const scale = keyScale.split("-").slice(1).join("-");

	const tuning = ["G4", "C4", "E4", "A4"];
	const maxFrets = 12;
	const scaleNumbers = getSciNumbers(scale, keyNote);

	return (
		<section aria-label="Fretboard">
			<h2>Fretboard</h2>
			<div
				data-title="Fretboard Grid"
				style={{
					"--max-frets": maxFrets,
					"--courses": tuning.length,
				}}
				className="grid grid-flow-col grid-cols-[repeat(var(--courses),1fr)_1rem] grid-rows-[1fr_0.25rem_repeat(calc(var(--max-frets)-1),1fr)] gap-[0.25rem]"
			>
				<div
					data-title="Zeroth fret"
					className="col-span-full row-[2] bg-[hsl(var(--background))]"
				></div>

				<button
					aria-label="Add course"
					autoFocus={true}
					className="col-start-[-2] row-start-1 ml-[0.3rem]"
				>
					+
				</button>

				{range(tuning.length).map((course) =>
					range(maxFrets).map((fret) => (
						<div
							data-title="Fretboard cell wrapper"
							key={`${course}-${fret}`}
							style={{
								"--course": course + 1,
								"--fret": fret + (fret > 0 ? 2 : 1),
							}}
							className="col-[var(--course)] row-[var(--fret)]"
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
