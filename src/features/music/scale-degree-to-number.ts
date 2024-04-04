import { accidentalToNumber } from "./accidental-to-number";

const numericScaleDegreePartToNumber = {
	1: 0,
	2: 2,
	3: 4,
	4: 5,
	5: 7,
	6: 9,
	7: 11,
} as const;

export const scaleDegreeToNumber = (scaleDegree: string) => {
	// scaleDegree takes the form of bb3, etc
	// parse using regex
	const scaleDegreeRegex = /([b#]{0,2})(\d)/;
	const scaleDegreeParts = scaleDegree.match(scaleDegreeRegex);

	if (!scaleDegreeParts) {
		return undefined;
	}

	const numericScaleDegreePart = parseInt(scaleDegreeParts[2]);
	const accidental = scaleDegreeParts[1] as keyof typeof accidentalToNumber;
	const numericPartNumber =
		numericScaleDegreePartToNumber[
			(numericScaleDegreePart %
				8) as keyof typeof numericScaleDegreePartToNumber
		];
	const accidentalNumber = accidentalToNumber[accidental];
	return (numericPartNumber + accidentalNumber + 12) % 12;
};
