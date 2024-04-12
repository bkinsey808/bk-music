import Link from "next/link";

import { DashboardProps, getDashboardUrl } from "@/app/d/dashboard-url";
import { getPositionArray } from "@/features/music/get-position-array";
import { setPageParam } from "@/helpers/state-url";

export function Position({
	position,
	dashboardProps,
}: {
	position: string;
	dashboardProps: DashboardProps;
}) {
	const params = setPageParam(dashboardProps, "position", position);

	const url = getDashboardUrl({
		params,
		searchParams: dashboardProps.searchParams,
	});

	const selected = position === dashboardProps.params.position;
	const positionArray = getPositionArray(position);

	return (
		<Link data-selected={selected} href={url}>
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
