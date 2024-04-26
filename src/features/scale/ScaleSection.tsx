"use client";

import Link from "next/link";

import { getNoteNumber } from "../music/getNoteNumber";
import { isScaleDegreeInScale } from "../music/isScaleDegreeInScale";
import { notesAndFlatNotes } from "../music/notes";
import { scaleDegrees } from "../music/scaleDegrees";
import { getSciBySpelling } from "../music/sci";
import { useDashboardState } from "@/app/d/useDashboardState";

export const ScaleSection = () => {
	const { keyNote, scale, toggleScaleDegree } = useDashboardState();
	const keyNoteNumber = getNoteNumber(keyNote);
	const sci = getSciBySpelling(scale);

	return (
		<section data-title="Scale Section">
			<div className="text-sm font-thin italic">{sci?.txtAltNames}</div>
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
		</section>
	);
};
