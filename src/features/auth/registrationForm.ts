import { ArrayFormatter, Schema as S } from "@effect/schema";
import { Either, Option } from "effect";

export enum RegisterFormFieldKey {
	Username = "userName",
	AcceptTermsAndConditions = "acceptTermsAndConditions",
}

enum MessageKey {
	UsernameRequired = "Username required",
	UsernameMaxLength = "Username must be less than 20 characters",
	UsernameAlphanumeric = "Username must only contain alphanumeric characters",
	TermsAndConditionsRequired = "You must accept the terms and conditions",
}

export const fieldMessageMap: Record<RegisterFormFieldKey, MessageKey[]> = {
	[RegisterFormFieldKey.Username]: [
		MessageKey.UsernameRequired,
		MessageKey.UsernameMaxLength,
		MessageKey.UsernameAlphanumeric,
	],
	[RegisterFormFieldKey.AcceptTermsAndConditions]: [
		MessageKey.TermsAndConditionsRequired,
	],
};

export const RegistrationFormStruct = S.Struct({
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
	[RegisterFormFieldKey.AcceptTermsAndConditions]: S.optionalToRequired(
		S.Literal("on"),
		S.Boolean.pipe(
			S.filter((value) =>
				value ? undefined : MessageKey.TermsAndConditionsRequired,
			),
		),
		{
			decode: Option.isSome,
			encode: (b) => (b ? Option.some("on" as const) : Option.none()),
		},
	),
});

export type ValidateForm = <Data extends Record<string, unknown>>(
	data: Data,
) => [Record<keyof Data, string>, undefined] | [undefined, Data];

export const validateRegistrationForm = <Data>(data: Data) => {
	const result = S.decodeUnknownEither(RegistrationFormStruct, {
		errors: "all",
	})(data);
	console.log({ result, RegistrationFormStruct, data });
	if (Either.isLeft(result)) {
		const schemaErrors = ArrayFormatter.formatErrorSync(result.left);
		const errors = schemaErrors.reduce(
			(acc, error) => {
				const fieldKey = error.path.join(".") as keyof Data;
				acc[fieldKey] = error.message;
				return acc;
			},
			{} as Record<keyof Data, string>,
		);

		return [errors, undefined];
	}
	return [undefined, result.right];
};

export type RegistrationFormValues = S.Schema.Type<
	typeof RegistrationFormStruct
>;
export type RegistrationFormErrors = Record<
	keyof RegistrationFormValues,
	string
>;
