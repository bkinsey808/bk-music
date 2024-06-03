import { Schema as S } from "@effect/schema";

import { MessageKey, RegisterFormFieldKey } from "./enums";

export const registrationFormFieldMessageMap: Record<
	RegisterFormFieldKey,
	MessageKey[]
> = {
	[RegisterFormFieldKey.Username]: [
		MessageKey.UsernameRequired,
		MessageKey.UsernameMaxLength,
		MessageKey.UsernameAlphanumeric,
	],
	[RegisterFormFieldKey.AcceptTermsAndConditions]: [
		MessageKey.TermsAndConditionsRequired,
	],
};

export const RegistrationSchema = S.Struct({
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
	[RegisterFormFieldKey.AcceptTermsAndConditions]: S.transform(
		S.String,
		S.Boolean,
		{
			decode: (value) => value === "on",
			encode: (value) => (value ? "on" : ""),
		},
	).pipe(
		S.filter((value) =>
			value ? undefined : MessageKey.TermsAndConditionsRequired,
		),
	),
});
