import { ArrayFormatter, Schema as S } from "@effect/schema";
import { Either } from "effect";

import { FormErrors, FormValues } from "./types";

export const validateValues = <
	FieldErrors extends FormErrors<FieldKey>["fieldErrors"],
	Values extends FormValues<FieldKey>,
	FieldKey extends string,
	A,
>(
	schema: S.Schema<A, A>,
) => {
	const decodeUnknownEither = S.decodeUnknownEither(schema, { errors: "all" });
	return (values: Values) =>
		Either.mapLeft(
			decodeUnknownEither(values),
			(parseError) =>
				ArrayFormatter.formatErrorSync(parseError).reduce(
					(acc, issue) => {
						const errorKey = issue.path.join(".") as FieldKey;
						acc[errorKey] = issue.message;
						return acc;
					},
					{} as Record<FieldKey, string>,
				) as FieldErrors,
		);
};
