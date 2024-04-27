"use client";

import Link from "next/link";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { getPositionArray } from "@/features/music/getPositionArray";

export const Position = ({ position }: { position: string }) => {
	const { getValue, setValue, getUrl } = useDashboardState();
	const selectedPosition = getValue(DashboardStateKey.POSITION);

	const selected = position === selectedPosition;
	const positionArray = getPositionArray(position);

	const url = getUrl(DashboardStateKey.POSITION, position);

	return (
		<Link
			data-title="Position"
			data-selected={selected}
			className="rounded-full border-[0.1rem] border-transparent px-[0.5rem] pb-[0.2rem] [&[data-selected='true']]:border-current"
			href={url}
			onClick={(e) => {
				e.preventDefault();
				setValue(DashboardStateKey.POSITION, position);
				return false;
			}}
		>
			<div className="flex gap-[0.5rem]">
				{positionArray.map((positionArrayElement, index) => (
					<div key={index} className="w-[1rem] text-center">
						{positionArrayElement}
					</div>
				))}
			</div>
		</Link>
	);
};