"use client";

import { getSciBySpelling } from "../music/sci";
import { useDashboardState } from "@/app/d/useDashboardState";

export const ScaleTitle = () => {
	const { keyNote, scale } = useDashboardState();
	const sci = getSciBySpelling(scale);

	return (
		<>
			<div>Scale{scale.length ? `: ` : null}</div>
			<div className="flex flex-grow gap-[0.4rem] overflow-hidden text-ellipsis text-nowrap">
				{keyNote.replace("b", "♭")} {sci?.txtCode}
				<div className="inline-flex flex-grow flex-row gap-[0.3rem]">
					(
					{scale.map((scaleDegree) => (
						<div key={scaleDegree}>{scaleDegree.replace("b", "♭")}</div>
					))}
					)<div>{sci?.txtName}</div>
				</div>
			</div>
		</>
	);
};
