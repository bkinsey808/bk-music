import { ScaleDegree } from "./scale-degree";
import { DashboardProps } from "@/app/d/[tuning]/[keyScale]/[chord]/page";
import { getRomanNumerals } from "@/helpers/get-roman-numerals";

export const ScaleDegrees = ({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	const { keyScale } = dashboardProps.params;
	const keyNote = keyScale.split("-")[0];

	// scale is all of the elements after the first
	const scale = keyScale.split("-").slice(1).join("-");

	return (
		<section data-title="Chords" className="flex flex-col gap-[0.5rem]">
			{getRomanNumerals(scale)?.map((scaleDegree, index) => (
				<ScaleDegree
					key={index}
					scaleIndex={index}
					keyNote={keyNote}
					scale={scale}
					romanNumeral={scaleDegree}
					chord={dashboardProps.params.chord}
				/>
			))}
		</section>
	);
};
0;
