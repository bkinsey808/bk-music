import { Position } from "./Position";
import { DashboardProps } from "@/app/d/dashboardUrl";
import { getPositions } from "@/features/music/getPositions";

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
		maxFretSpan: 4,
		maxMuted: 1,
	});
	return (
		<section
			data-title="Positions"
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
