"use client";

import Link from "next/link";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { getNoteNumber } from "@/features/music/getNoteNumber";
import { isScaleDegreeInScale } from "@/features/music/isScaleDegreeInScale";
import { notesAndFlatNotes } from "@/features/music/notes";
import { scaleDegrees } from "@/features/music/scaleDegrees";
import { getSciBySpelling } from "@/features/music/sci";

export const ScaleSection = () => {
	const { getValues, toggleScaleDegree } = useDashboardState();
	const [keyNote, scale] = getValues([
		DashboardStateKey.KEY_NOTE,
		DashboardStateKey.SCALE,
	]);
	const keyNoteNumber = getNoteNumber(keyNote);
	const sci = getSciBySpelling(scale);

	return (
		<section data-title="Scale Section">
			<div className="grid grid-cols-[repeat(6,1fr)]">
				{scaleDegrees.map((scaleDegree, index) => {
					const note =
						keyNoteNumber === undefined
							? undefined
							: notesAndFlatNotes[(keyNoteNumber + index) % 12]?.replace(
									"b",
									"♭",
								);

					const scaleDegreeInScale = isScaleDegreeInScale({
						scaleDegree,
						scale,
					});

					const Component = index > 0 ? Link : "div";

					return (
						<Component
							key={scaleDegree}
							data-title="Scale Degree"
							className="mr-[-0.1rem] break-all border-[0.1rem] border-current p-[0.4rem] text-center first:bg-[var(--color-cell-background-in-scale)]"
							href="#"
							onClick={(e) => {
								e.preventDefault();

								if (index > 0) {
									toggleScaleDegree(scaleDegree);
								}

								return false;
							}}
						>
							<div
								data-selected={scaleDegreeInScale}
								className="h-full rounded-full border-[0.1rem] border-transparent [&[data-selected='true']]:border-current"
							>
								<div>{scaleDegree.replace("b", "♭")}</div>
								{note ? <div>{note}</div> : null}
							</div>
						</Component>
					);
				})}
			</div>
			<div className="text-sm font-thin italic">{sci?.txtAltNames}</div>
		</section>
	);
};
