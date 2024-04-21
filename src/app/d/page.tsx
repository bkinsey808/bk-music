import { ChordScaleDegreeSection } from "@/features/chord-scale-degree/ChordScaleDegreeSection";
import { ChordScaleDegreeTitle } from "@/features/chord-scale-degree/ChordScaleDegreeTitle";
import { ChordSpellingSection } from "@/features/chord-spelling/ChordSpellingSection";
import { ChordSpellingTitle } from "@/features/chord-spelling/ChordSpellingTitle";
import { ChordSection } from "@/features/chord/ChordSection";
import { FretboardSection } from "@/features/fretboard/FretboardSection";
import { AccordionItem } from "@/features/global/AccordionItem";
import { PageColumn } from "@/features/global/PageColumn";
import { LyricsSection } from "@/features/lyrics/LyricsSection";
import { Positions } from "@/features/positions/PositionsSection";
import { QRCodeSection } from "@/features/qrcode/QRCodeSection";
import { ScaleDegreesSection } from "@/features/scale-degrees/ScaleDegreesSection";
import { ScaleSection } from "@/features/scale/ScaleSection";
import { SongSection } from "@/features/song/SongSection";

const enum Section {
	SONG = "so",
	LYRICS = "l",
	SCALE = "sc",
	SCALE_DEGREES = "sd",
	CHORD = "c",
	CHORD_SCALE_DEGREE = "csd",
	CHORD_SPELLING = "cs",
	POSITIONS = "ps",
	FRETBOARD = "f",
	QRCODE = "q",
}

type DashboardComponent = () => JSX.Element;

const sections: Record<
	Section,
	{
		title: DashboardComponent | string;
		section: DashboardComponent;
	}
> = {
	[Section.SONG]: {
		title: "Song",
		section: SongSection,
	},
	[Section.LYRICS]: {
		title: "Lyrics",
		section: LyricsSection,
	},
	[Section.SCALE]: {
		title: "Scale",
		section: ScaleSection,
	},
	[Section.SCALE_DEGREES]: {
		title: "Scale Degrees",
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
	[Section.FRETBOARD]: {
		title: "Fretboard",
		section: FretboardSection,
	},
	[Section.QRCODE]: {
		title: "QR Code",
		section: QRCodeSection,
	},
};

const leftSections: Section[] = [Section.SONG, Section.LYRICS];
const centerSections: Section[] = [
	Section.SCALE,
	Section.SCALE_DEGREES,
	Section.FRETBOARD,
];
const rightSections: Section[] = [
	Section.CHORD,
	Section.CHORD_SCALE_DEGREE,
	Section.CHORD_SPELLING,
	Section.POSITIONS,
	Section.QRCODE,
];
const pageColumns = [leftSections, centerSections, rightSections];

export default function Dashboard() {
	return (
		<div className="@container">
			<main className="grid grid-cols-1 @[1700px]:grid-cols-3">
				{pageColumns.map((pageColumn, columnIndex) => (
					<PageColumn key={columnIndex}>
						{pageColumn.map(async (section) => {
							const { title: Title, section: Section } = sections[section];

							return (
								<AccordionItem
									key={section}
									id={section}
									title={typeof Title === "string" ? Title : <Title />}
								>
									<Section />
								</AccordionItem>
							);
						})}
					</PageColumn>
				))}
			</main>
		</div>
	);
}
/*


["G4", "C4", "E4", "A4"]

Chromatic Scale: C Db D Eb E F Gb G Ab A Bb B

00 G   C   E   A 
    5   4   3   2
    ------------
01 Ab Db F   Bb
    b6 b2 4   b7    
02 A   D   Gb B
    6   2   b5 7
03 Bb Eb G   C
    b7 b3 5   4
04 B   E   Ab Db
    7   3   b6 b2
05 C   F   A   D
    1   4   6   2
06 Db Gb Bb Eb
    b2 b5 b7 b3
07 D   G   B   E
    2   5   7   3
08 Eb Ab C   F
    b3 b6 1   4
09 E   A   Db Gb
    3   6   b2 b5
10 F   Bb D   G
    4   b7 2   5
11 Gb B   Eb Ab
    b5 7   b3 b6
12 G   C   E   A
    5   1   3   6
13 Ab Db F   Bb
    b6 b2 4   b7



    b2 b3 4   5   b6 b7   : Scale Degrees
C   Db Eb F   G   Ab Bb   : Notes
Sa Re Ga Ma Pa Dh Ni   : Hindustani

00 G   C    
    5   1
    Pa Sa
    ------------
01 Ab Db F   Bb
    b6 b2 4   b7
    Dh Re Ma Ni
02         


03 Bb Eb G   C
    b7 b3 5   1
    Ni Ga Pa Sa
04      Ab Db
      b6 b2
      Dh Re
05 C   F   
    1   4
    Sa Ma
06 Db   Bb Eb
    b2   b7 b3
    Re   Ni Ga
07   G   B 
    5   7 
    Pa Ni
08 Eb Ab C   F
    b3 b6 1   4
    Ga Dh Sa Ma





Major Scale: C D E F G A B C

00 G   C   E   A 
    ------------
01   F    
02 A   D    B    
03   G    C    
04 B   E    
05 C   F   A   D
06         
07 D   G   B   E   
08      C   F
09 E   A    
10 F    D   G
11   B
12 G   C   E   A
13   F

*/
