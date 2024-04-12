import Link from "next/link";

import { getChords } from "./getChords";
import { DashboardProps, getDashboardUrl } from "@/app/d/dashboardUrl";
import { setPageParam } from "@/features/state-url/setPageParam";

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
		<Link
			data-title="Scale Degree Chord"
			data-selected={selected}
			href={url}
			className="flex h-[2rem] items-center border-[0.1rem] border-transparent px-[0.2rem] [&[data-selected='true']]:border-current"
		>
			{chord?.chord?.txtCode}
		</Link>
	);
};
