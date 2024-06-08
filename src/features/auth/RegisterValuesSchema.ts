import { Schema as S } from "@effect/schema";

import { RegisterFormFieldKey } from "./enums";

export const RegisterValuesSchema = S.Struct({
	[RegisterFormFieldKey.Username]: S.String,
	[RegisterFormFieldKey.AcceptTermsAndConditions]: S.transform(
		S.String,
		S.Boolean,
		{
			decode: (value) => value === "on",
			encode: (value) => (value ? "on" : ""),
		},
	),
});
