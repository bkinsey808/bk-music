import { accidentalToNumber } from "./accidental-to-number";

const numericScaleDegreePartToNumber: { [key: number]: number } = {
	1: 0,
	2: 2,
	3: 4,
	4: 5,
	5: 7,
	6: 9,
	7: 11,
};

export const scaleDegreeToNumber = (scaleDegree: string) => {
	// scaleDegree takes the form of bb3, etc
	// parse using regex
	const scaleDegreeRegex = /([b#]{0,2})(\d)/;
	const scaleDegreeParts = scaleDegree.match(scaleDegreeRegex);

	if (!scaleDegreeParts) {
		return undefined;
	}

	const numericScaleDegreePart = parseInt(scaleDegreeParts[2]);
	const accidental = scaleDegreeParts[1];
	const numericPartNumber =
		numericScaleDegreePartToNumber[numericScaleDegreePart % 8];
	const accidentalNumber = accidentalToNumber[accidental];
	return (numericPartNumber + accidentalNumber + 12) % 12;
};
