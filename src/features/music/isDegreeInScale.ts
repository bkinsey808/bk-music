import { Scale } from "@/app/d/useDashboardState";

export const isDegreeInScale = ({
	degree,
	scale,
}: {
	degree: string;
	scale: Scale;
}) => scale.includes(degree);
