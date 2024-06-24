"use client";

import { useState } from "react";
import useDebouncedEffect from "use-debounced-effect";

import { CreditsSection } from "../credits/CreditsSection";
import { KeySection } from "../key/KeySection";
import { KeyTitle } from "../key/KeyTitle";
import { LyricsSection } from "../lyrics/LyricsSection";
import { ScaleSection } from "../scale/ScaleSection";
import { ScaleTitle } from "../scale/ScaleTitle";
import { Section } from "../sections";
import { TranslationSection } from "../translation/TranslationSection";
import { DashboardAccordion } from "@/app/d/DashboardAccordion";
import {
	DashboardStateKey,
	useDashboardState,
} from "@/app/d/useDashboardState";
import { Input } from "@/features/design-system/form/Input";

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
			<Input
				name="song"
				value={song}
				onChange={(e) => {
					setSong(e.target.value);
				}}
				onBlur={(e) => {
					setSong(e.target.value.trim());
				}}
				placeholder="Song Title"
			/>

			<div className="flex flex-col gap-[0.2rem] px-[0.2rem]">
				<DashboardAccordion
					key={Section.CREDITS}
					id={Section.CREDITS}
					title="Credits"
				>
					<CreditsSection />
				</DashboardAccordion>

				<DashboardAccordion
					key={Section.LYRICS}
					id={Section.LYRICS}
					title="Lyrics"
				>
					<LyricsSection />
				</DashboardAccordion>

				<DashboardAccordion
					key={Section.TRANSLATION}
					id={Section.TRANSLATION}
					title="Translation"
				>
					<TranslationSection />
				</DashboardAccordion>

				<DashboardAccordion
					key={Section.KEY}
					id={Section.KEY}
					title={<KeyTitle />}
				>
					<KeySection />
				</DashboardAccordion>

				<DashboardAccordion
					key={Section.SCALE}
					id={Section.SCALE}
					title={<ScaleTitle />}
				>
					<ScaleSection />
				</DashboardAccordion>
			</div>
		</section>
	);
};
