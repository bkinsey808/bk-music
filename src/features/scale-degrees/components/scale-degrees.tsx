// "use client";
import { ScaleDegree } from "./scale-degree";
import { getRomanNumerals } from "@/helpers/get-roman-numerals";

interface ScaleDegreesProps {
	keyNote: string;
	scale: string;
	chord: string;
}

export const ScaleDegrees = ({ keyNote, scale, chord }: ScaleDegreesProps) => {
	return (
		<section data-title="Chords" className="flex flex-col gap-[0.5rem]">
			{getRomanNumerals(scale)?.map((scaleDegree, index) => (
				<ScaleDegree
					key={index}
					scaleIndex={index}
					keyNote={keyNote}
					scale={scale}
					romanNumeral={scaleDegree}
					chord={chord}
				/>
			))}
		</section>
	);
};
0;
