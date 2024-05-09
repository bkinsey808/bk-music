import { Position } from "@/app/d/useDashboardState";

export const getPositionValuesForFret = ({
	fret,
	maxFret,
	maxFretSpan,
}: {
	fret: number;
	maxFret: number;
	maxFretSpan: number;
}) => {
	const valueSet = new Set<Position[number]>([0, "x"]);

	if (fret > 0) {
		const max = Math.min(maxFret, fret + maxFretSpan);
		for (let i = fret; i <= max; i++) {
			valueSet.add(i);
		}
	}
	return Array.from(valueSet);
};
