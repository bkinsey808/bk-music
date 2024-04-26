"use client";

import TextareaAutosize from "react-textarea-autosize";

import { useDashboardState } from "@/app/d/useDashboardState";

export function LyricsSection() {
	const { lyrics, setLyrics } = useDashboardState();

	return (
		<section data-title="Lyrics Section">
			<TextareaAutosize
				className="w-full rounded-[0.2rem] border-[0.1rem] border-current bg-[var(--background)] p-[0.3rem] px-[0.6rem] text-current"
				name="lyrics"
				value={lyrics}
				onChange={(e) => {
					setLyrics(e.target.value);
				}}
				onBlur={(e) => {
					setLyrics(e.target.value.trim());
				}}
			/>
		</section>
	);
}
