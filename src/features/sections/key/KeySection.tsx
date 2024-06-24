"use client";

import Link from "next/link";

import {
	DashboardState,
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { notesAndFlatNotes } from "@/features/music/notes";

export const KeySection = () => {
	const { getValue, setValues, getUrl } = useDashboardState();
	const selectedKeyNote = getValue(DashboardStateKey.KEY_NOTE);

	return (
		<section
			data-title="Song Section"
			className="grid grid-cols-[repeat(6,1fr)]"
		>
			{notesAndFlatNotes.map((note) => {
				const newState: Partial<DashboardState> = {
					[DashboardStateKey.KEY_NOTE]:
						note === selectedKeyNote ? undefined : note,
				};
				return (
					<Link
						key={note}
						data-title="Chord Scale Degree"
						href={getUrl(newState)}
						className="mr-[-0.1rem] break-all border border-current p-[0.4rem] text-center"
						onClick={(e) => {
							e.preventDefault();
							setValues(newState);
							return false;
						}}
					>
						<div
							data-selected={note === selectedKeyNote}
							className="h-full rounded-full border border-transparent [&[data-selected='true']]:border-current"
						>
							{note.replace("b", "♭")}
						</div>
					</Link>
				);
			})}
		</section>
	);
};
