import { pageColumns, sections } from "./pageColumns";
import { AccordionItem } from "@/features/global/AccordionItem";
import { PageColumn } from "@/features/global/PageColumn";
import { Header } from "@/features/header/header";

export default function Dashboard() {
	return (
		<div className="@container">
			<Header />
			<main className="h-screen overflow-auto">
				<div className="grid grid-cols-1 @[1700px]:grid-cols-3">
					{pageColumns.map((pageColumn, columnIndex) => (
						<PageColumn key={columnIndex}>
							{pageColumn.map((section) => {
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
				</div>
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
