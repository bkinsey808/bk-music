"use client";

import TextareaAutosize from "react-textarea-autosize";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";

export function LyricsSection() {
	const { getValue, setValue } = useDashboardState();

	return (
		<section data-title="Lyrics Section">
			<TextareaAutosize
				className="w-full rounded-[0.2rem] border-[0.1rem] border-current bg-[var(--background)] p-[0.3rem] px-[0.6rem] text-current"
				name="lyrics"
				value={getValue(DashboardStateKey.LYRICS)}
				onChange={(e) => {
					setValue(DashboardStateKey.LYRICS, e.target.value);
				}}
				onBlur={(e) => {
					setValue(DashboardStateKey.LYRICS, e.target.value.trim());
				}}
			/>
		</section>
	);
}
