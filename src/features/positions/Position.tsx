"use client";

import Link from "next/link";

import { useDashboardState } from "@/app/d/useDashboardState";
import { getPositionArray } from "@/features/music/getPositionArrayget-position-array";

export const Position = ({ position }: { position: string }) => {
	const {
		position: selectedPosition,
		getPositionUrl,
		setPosition,
	} = useDashboardState();

	const selected = position === selectedPosition;
	const positionArray = getPositionArray(position);

	const url = getPositionUrl(position);

	return (
		<Link
			data-title="Position"
			data-selected={selected}
			href={url}
			onClick={(e) => {
				e.preventDefault();
				setPosition(position);
				return false;
			}}
		>
			<div className="flex gap-[0.5rem] [&>div]:w-[1rem] [&>div]:text-end">
				[
				{positionArray.map((positionArrayElement, index) => (
					<div key={index}>{positionArrayElement}</div>
				))}
				]
			</div>
		</Link>
	);
};
