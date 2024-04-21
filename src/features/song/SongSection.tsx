"use client";

import { useDashboardState } from "@/app/d/useDashboardState";

export const SongSection = () => {
	const { song, setSong } = useDashboardState();

	return (
		<section data-title="Song Section">
			<input
				className="w-full rounded-[0.2rem] border-[0.1rem] border-current bg-[var(--background)] p-[0.3rem] px-[0.6rem] text-current"
				name="song"
				value={song}
				onChange={(e) => {
					setSong(e.target.value);
				}}
			/>
		</section>
	);
};
