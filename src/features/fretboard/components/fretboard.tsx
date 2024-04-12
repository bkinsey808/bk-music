import { FretboardCell } from "./fretboard-cell";
import { DashboardProps } from "@/app/d/dashboard-url";
import { range } from "@/features/math/range";

export const Fretboard = ({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	const tuningArray = dashboardProps.params.tuning.split("-");
	const maxFrets = 13;

	return (
		<section aria-label="Fretboard">
			<div
				data-title="Fretboard Grid"
				style={{
					"--max-frets": maxFrets,
					"--courses": tuningArray.length,
				}}
				className="grid grid-flow-col grid-cols-[1.5rem_repeat(var(--courses),1fr)_1rem] grid-rows-[1rem_1fr_0.25rem_repeat(calc(var(--max-frets)-1),1fr)] gap-[0.25rem]"
			>
				<div
					data-title="Zeroth fret"
					className="col-span-full row-[2] bg-[hsl(var(--background))]"
				></div>

				<button
					aria-label="Add course"
					autoFocus={true}
					className="col-start-[-2] row-start-2 ml-[0.3rem]"
				>
					+
				</button>

				{range(maxFrets).map((fret) => (
					<div
						key={fret}
						style={{
							"--fret": fret + (fret > 0 ? 2 : 1),
						}}
						className="col-start-1 row-[calc(var(--fret)+1)] grid items-center"
						data-title={`Fret ${fret}`}
					>
						F{fret}
					</div>
				))}

				{range(tuningArray.length).map((course) => (
					<>
						<div
							style={{
								"--course": course + 1,
							}}
							className="row-1 col-[calc(var(--course)+1)] flex h-[0.5rem] justify-center"
						>
							<span>Course {course}</span>
						</div>
						{range(maxFrets).map((fret) => (
							<div
								data-title="Fretboard cell wrapper"
								key={`${course}-${fret}`}
								style={{
									"--course": course + 1,
									"--fret": fret + (fret > 0 ? 2 : 1),
								}}
								className="col-[calc(var(--course)+1)] row-[calc(var(--fret)+1)]"
							>
								<FretboardCell
									course={course}
									fret={fret}
									dashboardProps={dashboardProps}
								/>
							</div>
						))}
					</>
				))}
			</div>
		</section>
	);
};
