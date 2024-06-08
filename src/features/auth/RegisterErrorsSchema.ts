import { Schema as S } from "@effect/schema";

import { MessageKey, RegisterFormFieldKey } from "./enums";

export const RegisterErrorsSchema = S.Struct({
	[RegisterFormFieldKey.Username]: S.String.pipe(
		S.nonEmpty({ message: () => MessageKey.UsernameRequired }),
		S.filter((value) =>
			value.length < 20 ? undefined : MessageKey.UsernameMaxLength,
		),
		S.filter((value) =>
			// must not contain whitespace or non-alphanumeric characters
			/^[a-zA-Z0-9]*$/.test(value)
				? undefined
				: MessageKey.UsernameAlphanumeric,
		),
	),
	[RegisterFormFieldKey.AcceptTermsAndConditions]: S.Boolean.pipe(
		S.filter((value) =>
			value ? undefined : MessageKey.TermsAndConditionsRequired,
		),
	),
});
