import { PositionArray } from "./positionArray";

export const getPositionArray = (position: string) => {
	const positionArray: PositionArray = position
		.split("-")
		.map((positionElement) => {
			if (positionElement === "x") {
				return "x";
			}

			if (positionElement.includes(",")) {
				console.trace();
			}
			try {
				return parseInt(positionElement);
			} catch {
				console.error(positionElement);
			}
			return "x";
		});

	return positionArray;
};
