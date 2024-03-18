// "use client";
import { index } from "@effect/schema/ParseResult";

import { getChords } from "@/helpers/get-chords";
import { getRomanNumerals } from "@/helpers/get-roman-numerals";

// import { useRouter } from "next/navigation";

interface ScaleDegreeProps {
	keyNote: string;
	scale: string;
	romanNumeral: string;
	index: number;
}

export const ScaleDegree = ({
	keyNote,
	scale,
	romanNumeral,
	index,
}: ScaleDegreeProps) => {
	const chords = getChords({
		scale,
		scaleIndex: index,
	});

	return (
		<div className="flex flex-row gap-[0.5rem]">
			<div className="min-w-[2rem]">{romanNumeral}</div>
			<div className="flex flex-row flex-wrap gap-[0.5rem]">
				{chords?.map((chord, index) => (
					<div key={index}>{chord.chord.txtCode}</div>
				))}
			</div>
		</div>
	);
};
