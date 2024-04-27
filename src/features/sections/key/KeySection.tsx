"use client";

import Link from "next/link";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { notesAndFlatNotes } from "@/features/music/notes";

export const KeySection = () => {
	const { getValue, setValue, getUrl } = useDashboardState();
	const selectedKeyNote = getValue(DashboardStateKey.KEY_NOTE);

	return (
		<section
			data-title="Song Section"
			className="grid grid-cols-[repeat(6,1fr)]"
		>
			{notesAndFlatNotes.map((note) => (
				<Link
					key={note}
					data-title="Chord Scale Degree"
					href={getUrl(DashboardStateKey.KEY_NOTE, note)}
					className="mr-[-0.1rem] break-all border-[0.1rem] border-current p-[0.4rem] text-center"
					onClick={(e) => {
						e.preventDefault();
						setValue(DashboardStateKey.KEY_NOTE, note);
						return false;
					}}
				>
					<div
						data-selected={note === selectedKeyNote}
						className="h-full rounded-full border-[0.1rem] border-transparent [&[data-selected='true']]:border-current"
					>
						{note.replace("b", "♭")}
					</div>
				</Link>
			))}
		</section>
	);
};
