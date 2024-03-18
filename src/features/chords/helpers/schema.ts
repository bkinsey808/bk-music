import * as S from "@effect/schema/Schema";

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
