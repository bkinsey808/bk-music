import Link from "next/link";

import { DashboardProps, getDashboardUrl } from "@/app/d/dashboardUrl";
import { getPositionArray } from "@/features/music/getPositionArrayget-position-array";
import { setPageParams } from "@/features/state-url/setPageParams";

export function Position({
	position,
	dashboardProps,
}: {
	position: string;
	dashboardProps: DashboardProps;
}) {
	const params = setPageParams(dashboardProps, { position });

	const url = getDashboardUrl({
		params,
		searchParams: dashboardProps.searchParams,
	});

	const selected = position === dashboardProps.params.position;
	const positionArray = getPositionArray(position);

	return (
		<Link data-title="Position" data-selected={selected} href={url}>
			<div className="flex gap-[0.5rem] [&>div]:w-[1rem] [&>div]:text-end">
				[
				{positionArray.map((positionArrayElement, index) => (
					<div key={index}>{positionArrayElement}</div>
				))}
				]
			</div>
		</Link>
	);
}
