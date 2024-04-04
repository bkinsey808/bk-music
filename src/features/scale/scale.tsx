import { DashboardProps } from "@/app/d/dashboard-url";

export const Scale = ({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	const { keyScale } = dashboardProps.params;
	const keyNote = keyScale.split("-")[0];

	// scale is all of the elements after the first
	const scale = keyScale.split("-").slice(1).join("-");

	return (
		<section>
			<h2>Scale</h2>
			<div className="flex flex-col">
				Key: {keyNote}
				<br />
				Scale: {scale}
			</div>
		</section>
	);
};
0;
