// "use client";
import { ScaleDegree } from "../chords/scale-degree";
import { getRomanNumerals } from "@/helpers/get-roman-numerals";

// import { useRouter } from "next/navigation";

interface ScaleProps {
	keyNote: string;
	scale: string;
}

export const Scale = ({ keyNote, scale }: ScaleProps) => {
	return (
		<section>
			<h2>Scale</h2>
			<div className="flex flex-col">
				Key: {keyNote}
				<br />
				Scale: {scale}
			</div>
		</section>
	);
};
0;
