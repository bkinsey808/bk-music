import * as S from "@effect/schema/Schema";
import * as Either from "effect/Either";

import * as sciListJson from "@/features/music/sci-list.json";

export const Sci = S.struct({
	id: S.number,
	txtName: S.string,
	txtCode: S.string,
	txtSpelling: S.string,
	booPrefer: S.number,
	numNote: S.number,
	numOrdering: S.number,
	numSymForms: S.number,
	numHalfStepsInRow: S.number,
	txtNumIntervalForm: S.string,
	txtAltNames: S.string,
});

export type SciType = S.Schema.Type<typeof Sci>;

export const SciList = S.array(Sci);

// I don't understand why this manual processing seems to be needed
const sciListArray = Array.isArray(sciListJson)
	? sciListJson
	: Object.keys(sciListJson)
			.map((key) => sciListJson[key as unknown as number])
			.filter((sci) => !Array.isArray(sci) && typeof sci === "object");

const parseEitherResult = S.decodeUnknownEither(SciList)(sciListArray);

export const sciList = Either.isRight(parseEitherResult)
	? parseEitherResult.right
	: undefined;

export const sciListError = Either.isLeft(parseEitherResult);

export const getSciBySpelling = (spelling: string) =>
	sciList?.find((sci) => sci.txtSpelling === spelling.replaceAll("-", ","));
