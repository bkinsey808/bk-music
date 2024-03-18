// "use client";
import { ScaleDegree } from "./scale-degree";
import { getRomanNumerals } from "@/helpers/get-roman-numerals";

// import { useRouter } from "next/navigation";

interface ChordsProps {
	keyNote: string;
	scale: string;
	chord: string;
}

export const Chords = ({ keyNote, scale, chord }: ChordsProps) => {
	console.log({ chord });

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