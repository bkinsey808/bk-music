"use client";

import TextareaAutosize from "react-textarea-autosize";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";

export function TranslationSection() {
	const { getValue, setValue } = useDashboardState();

	return (
		<section data-title="Lyrics Section">
			<TextareaAutosize
				className="w-full rounded-[0.2rem] border border-current bg-[var(--background)] p-[0.3rem] px-[0.6rem] text-current"
				name="lyrics"
				value={getValue(DashboardStateKey.TRANSLATION)}
				onChange={(e) => {
					setValue(DashboardStateKey.TRANSLATION, e.target.value);
				}}
				onBlur={(e) => {
					setValue(DashboardStateKey.TRANSLATION, e.target.value.trim());
				}}
			/>
		</section>
	);
}
