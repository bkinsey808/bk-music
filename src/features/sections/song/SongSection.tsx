"use client";

import { useState } from "react";
import useDebouncedEffect from "use-debounced-effect";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";

export const SongSection = () => {
	const { getValue, setValue } = useDashboardState();
	const [song, setSong] = useState(getValue(DashboardStateKey.SONG));

	useDebouncedEffect(
		() => {
			setValue(DashboardStateKey.SONG, song);
		},
		2000,
		[song],
	);

	return (
		<section data-title="Song Section">
			<input
				className="w-full rounded-[0.2rem] border-[0.1rem] border-current bg-[var(--background)] p-[0.3rem] px-[0.6rem] text-current"
				name="song"
				value={song}
				onChange={(e) => {
					setSong(e.target.value);
				}}
				onBlur={(e) => {
					setSong(e.target.value.trim());
				}}
			/>
		</section>
	);
};
