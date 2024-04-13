import Link from "next/link";

import { getChords } from "./getChords";
import { DashboardProps, getDashboardUrl } from "@/app/d/dashboardUrl";
import { setPageParams } from "@/features/state-url/setPageParams";

interface ScaleDegreeChordProps {
	sci:
		| NonNullable<NonNullable<ReturnType<typeof getChords>>[number]>["sci"]
		| undefined;
	selected: boolean;
	dashboardProps: DashboardProps;
	romanNumeral: string;
}

export const ScaleDegreeChord = ({
	sci,
	selected,
	dashboardProps,
	romanNumeral,
}: ScaleDegreeChordProps) => {
	const params = setPageParams(dashboardProps, {
		chord: `${romanNumeral?.toLowerCase()}-${sci?.txtSpelling?.replaceAll(",", "-")}`,
		position: "-",
	});

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
			{sci?.txtCode}
		</Link>
	);
};
