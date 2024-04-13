import { ScaleDegree } from "./ScaleDegree";
import { DashboardProps } from "@/app/d/dashboardUrl";
import { getRomanNumerals } from "@/features/music/getRomanNumerals";

export const ScaleDegreesSection = ({
	dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	const { keyScale } = dashboardProps.params;

	// scale is all of the elements after the first
	const scale = keyScale.split("-").slice(1).join("-");

	return (
		<section
			data-title="Scale Degrees Section"
			className="flex flex-col gap-[0.5rem]"
		>
			{getRomanNumerals(scale)?.map((romanNumeral) => (
				<ScaleDegree
					key={romanNumeral}
					scale={scale}
					romanNumeral={romanNumeral}
					dashboardProps={dashboardProps}
				/>
			))}
		</section>
	);
};
