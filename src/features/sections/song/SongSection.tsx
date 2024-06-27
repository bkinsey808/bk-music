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
import { DashboardStateKey } from "@/app/d/enums";
import { useDashboardState } from "@/app/d/useDashboardState";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/useAuth";
import { Input } from "@/features/design-system/form/Input";

export const SongSection = () => {
	const { getValues, setValue, saveSong } = useDashboardState();
	const { userData } = useAuth();
	const [songName, songId, isSavingSong] = getValues([
		DashboardStateKey.SONG_NAME,
		DashboardStateKey.SONG_ID,
		DashboardStateKey.IS_SAVING_SONG,
	]);
	const [localStateSongName, setLocalStateSongName] = useState(songName);

	useDebouncedEffect(
		() => {
			setValue(DashboardStateKey.SONG_NAME, localStateSongName);
		},
		200,
		[localStateSongName],
	);

	return (
		<section data-title="Song Section">
			<Input
				name="song"
				value={localStateSongName}
				onChange={(e) => {
					setLocalStateSongName(e.target.value);
				}}
				onBlur={(e) => {
					setLocalStateSongName(e.target.value.trim());
				}}
				placeholder="Song Title"
			/>

			{userData ? (
				<div className="flex gap-[0.5rem]">
					<Button disabled={isSavingSong || !songName} onClick={saveSong}>
						Save
					</Button>
					{songId ? <Button>Save As...</Button> : null}
					<Button>New</Button>
				</div>
			) : null}

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
