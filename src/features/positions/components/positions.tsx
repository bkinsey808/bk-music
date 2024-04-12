import { Position } from "./position";
import { DashboardProps } from "@/app/d/dashboard-url";
import { getPositions } from "@/features/music/get-positions";

export function Positions({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) {
	const positions = getPositions({
		chord: dashboardProps.params.chord,
		keyNote: dashboardProps.params.keyScale.split("-")[0],
		tuning: dashboardProps.params.tuning,
		maxFret: 12,
		maxFretSpan: 5,
		maxMuted: 1,
	});
	return (
		<section
			aria-label="Positions"
			className="flex flex-wrap gap-x-[1rem] [&>a[data-selected='true']]:border-current [&>a]:border-[0.1rem] [&>a]:border-transparent [&>a]:px-[0.5rem]"
		>
			{positions.map((position) => (
				<Position
					key={position}
					dashboardProps={dashboardProps}
					position={position}
				/>
			))}
		</section>
	);
}
