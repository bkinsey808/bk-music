import { useDashboardState } from "@/app/d/useDashboardState";

export const isScaleDegreeInScale = ({
	scaleDegree,
	scale,
}: {
	scaleDegree: string;
	scale: ReturnType<typeof useDashboardState>["scale"];
}) => scale.includes(scaleDegree);
