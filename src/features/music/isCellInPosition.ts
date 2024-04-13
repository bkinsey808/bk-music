import { getPositionArray } from "./getPositionArrayget-position-array";

export const isCellInPosition = ({
	position,
	fret,
	course,
}: {
	position: string;
	fret: number;
	course: number;
}) => {
	const positionArray = getPositionArray(position);
	return positionArray[course] === fret;
};