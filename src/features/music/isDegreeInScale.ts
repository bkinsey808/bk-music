import { Scale } from "@/app/d/types";

export const isDegreeInScale = ({
	degree,
	scale,
}: {
	degree: string;
	scale: Scale;
}) => scale.includes(degree);
