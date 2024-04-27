import { Scale } from "@/app/d/useDashboardState";

export const isScaleDegreeInScale = ({
	scaleDegree,
	scale,
}: {
	scaleDegree: string;
	scale: Scale;
}) => scale.includes(scaleDegree);
