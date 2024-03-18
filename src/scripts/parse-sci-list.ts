import * as S from "@effect/schema/Schema";
import * as Either from "effect/Either";
import fs from "fs";
import { parse } from "path";

const filePath = "./src/helpers/sci-list.json";

const Sci = S.struct({
	txtName: S.string,
	txtCode: S.string,
	txtSpelling: S.string,
	id: S.number,
	booPrefer: S.number,
	numNote: S.number,
	numOrdering: S.number,
	numSymForms: S.number,
	numHalfStepsInRow: S.number,
	txtNumIntervalForm: S.string,
	txtAltNames: S.string,
});

const SciList = S.array(Sci);

try {
	const fileData = fs.readFileSync(filePath, "utf-8");
	const parsedData = JSON.parse(fileData);

	// for each object in the parsedData array, check if it parses using the Sci type
	// if it does, use the parsed data
	// if it doesn't, log an error
	parsedData.forEach((sci: any) => {
		const parseEitherResult = S.parseEither(Sci)(sci);
		const parsedSci = Either.isRight(parseEitherResult)
			? parseEitherResult.right
			: undefined;
		const parseSciError = Either.isLeft(parseEitherResult);
		if (parseSciError) {
			console.error("Error parsing sci:", { sci, parseSciError });
		}
	});

	const parseEitherResult = S.parseEither(SciList)(parsedData);
	const parsedSci = Either.isRight(parseEitherResult)
		? parseEitherResult.right
		: undefined;

	const parseSciError = Either.isLeft(parseEitherResult);

	if (parseSciError) {
		console.error("Error parsing sci list:", { parseSciError });
	} else {
		console.log("success");
	}

	// Use the parsed data here
} catch (error) {
	console.error("Error parsing JSON file:", error);
}
