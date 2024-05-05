import { TuningSection } from "./tuning/TuningSection";
import { ChordSpellingSection } from "@/features/chord-spelling/ChordSpellingSection";
import { ChordSpellingTitle } from "@/features/chord-spelling/ChordSpellingTitle";
import { ChordScaleDegreeSection } from "@/features/sections/chord-scale-degree/ChordScaleDegreeSection";
import { ChordScaleDegreeTitle } from "@/features/sections/chord-scale-degree/ChordScaleDegreeTitle";
import { ChordSection } from "@/features/sections/chord/ChordSection";
import { CreditsSection } from "@/features/sections/credits/CreditsSection";
import { FretboardSection } from "@/features/sections/fretboard/FretboardSection";
import { KeySection } from "@/features/sections/key/KeySection";
import { KeyTitle } from "@/features/sections/key/KeyTitle";
import { LyricsSection } from "@/features/sections/lyrics/LyricsSection";
import { Positions } from "@/features/sections/positions/PositionsSection";
import { QRCodeSection } from "@/features/sections/qrcode/QRCodeSection";
import { ScaleDegreesSection } from "@/features/sections/scale-degrees/ScaleDegreesSection";
import { ScaleDegreesTitle } from "@/features/sections/scale-degrees/ScaleDegreesTitle";
import { ScaleSection } from "@/features/sections/scale/ScaleSection";
import { ScaleTitle } from "@/features/sections/scale/ScaleTitle";
import { SongSection } from "@/features/sections/song/SongSection";
import { SongTitle } from "@/features/sections/song/SongTitle";
import { TranslationSection } from "@/features/sections/translation/TranslationSection";

const enum Section {
	SONG = "so",
	TRANSLATION = "tr",
	CREDITS = "cr",
	LYRICS = "l",
	KEY = "k",
	SCALE = "sc",
	SCALE_DEGREES = "sd",
	CHORD = "c",
	CHORD_SCALE_DEGREE = "csd",
	CHORD_SPELLING = "cs",
	POSITIONS = "ps",
	TUNING = "t",
	FRETBOARD = "f",
	QRCODE = "q",
}

type DashboardComponent = () => JSX.Element;
type Sections = Record<
	Section,
	{ title: DashboardComponent | string; section: DashboardComponent }
>;

export const sections: Sections = {
	[Section.SONG]: {
		title: SongTitle,
		section: SongSection,
	},
	[Section.LYRICS]: {
		title: "Lyrics",
		section: LyricsSection,
	},
	[Section.CREDITS]: {
		title: "Credits",
		section: CreditsSection,
	},
	[Section.TRANSLATION]: {
		title: "Translation",
		section: TranslationSection,
	},

	[Section.KEY]: {
		title: KeyTitle,
		section: KeySection,
	},

	[Section.SCALE]: {
		title: ScaleTitle,
		section: ScaleSection,
	},
	[Section.SCALE_DEGREES]: {
		title: ScaleDegreesTitle,
		section: ScaleDegreesSection,
	},
	[Section.CHORD]: {
		title: "Chord",
		section: ChordSection,
	},
	[Section.CHORD_SCALE_DEGREE]: {
		title: ChordScaleDegreeTitle,
		section: ChordScaleDegreeSection,
	},
	[Section.CHORD_SPELLING]: {
		title: ChordSpellingTitle,
		section: ChordSpellingSection,
	},
	[Section.POSITIONS]: {
		title: "Positions",
		section: Positions,
	},
	[Section.TUNING]: {
		title: "Tuning",
		section: TuningSection,
	},
	[Section.FRETBOARD]: {
		title: "Fretboard",
		section: FretboardSection,
	},
	[Section.QRCODE]: {
		title: "QR Code",
		section: QRCodeSection,
	},
};

const leftSections: Section[] = [
	Section.SONG,
	Section.CREDITS,
	Section.LYRICS,
	Section.TRANSLATION,
	Section.KEY,
];
const centerSections: Section[] = [
	Section.SCALE,
	Section.SCALE_DEGREES,
	Section.TUNING,
	Section.FRETBOARD,
];
const rightSections: Section[] = [
	Section.CHORD,
	Section.CHORD_SCALE_DEGREE,
	Section.CHORD_SPELLING,
	Section.POSITIONS,
	Section.QRCODE,
];

export const pageColumns = [leftSections, centerSections, rightSections];
