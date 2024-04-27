"use client";

import TextareaAutosize from "react-textarea-autosize";

import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";

export function CreditsSection() {
	const { getValue, setValue } = useDashboardState();

	return (
		<section data-title="Credits Section">
			<TextareaAutosize
				className="w-full rounded-[0.2rem] border-[0.1rem] border-current bg-[var(--background)] p-[0.3rem] px-[0.6rem] text-current"
				name="Credits"
				value={getValue(DashboardStateKey.CREDITS)}
				onChange={(e) => {
					setValue(DashboardStateKey.CREDITS, e.target.value);
				}}
				onBlur={(e) => {
					setValue(DashboardStateKey.CREDITS, e.target.value.trim());
				}}
			/>
		</section>
	);
}
