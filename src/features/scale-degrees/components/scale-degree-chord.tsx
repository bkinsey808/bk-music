import Link from "next/link";

import { getChords } from "../helpers/get-chords";
import { DashboardProps, getDashboardUrl } from "@/app/d/dashboard-url";
import { setPageParam } from "@/helpers/state-url";

interface ScaleDegreeChordProps {
	chord: NonNullable<ReturnType<typeof getChords>>[number];
	selected: boolean;
	dashboardProps: DashboardProps;
}

export const ScaleDegreeChord = ({
	chord,
	selected,
	dashboardProps,
}: ScaleDegreeChordProps) => {
	const params = setPageParam(
		dashboardProps,
		"chord",
		`${chord?.romanNumeral?.toLowerCase()}-${chord?.chord?.txtSpelling?.replaceAll(",", "-")}`,
	);

	const url = getDashboardUrl({
		params,
		searchParams: dashboardProps.searchParams,
	});

	return (
		<Link data-selected={selected} href={url}>
			{chord?.chord?.txtCode}
		</Link>
	);
};
