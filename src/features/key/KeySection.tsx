"use client";

import Link from "next/link";

import { notesAndFlatNotes } from "../music/notes";
import { useDashboardState } from "@/app/d/useDashboardState";

export const KeySection = () => {
	const {
		keyNote: selectedKeyNote,
		setKeyNote,
		getKeyNoteUrl,
	} = useDashboardState();

	return (
		<section
			data-title="Song Section"
			className="grid grid-cols-[repeat(6,1fr)]"
		>
			{notesAndFlatNotes.map((note) => (
				<Link
					key={note}
					data-title="Chord Scale Degree"
					href={getKeyNoteUrl(note)}
					className="mr-[-0.1rem] break-all border-[0.1rem] border-current p-[0.4rem] text-center"
					onClick={(e) => {
						e.preventDefault();
						setKeyNote(note);
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
