import { Schema as S } from "@effect/schema";
import { Either } from "effect";
import { Dispatch, FormEvent, SetStateAction } from "react";

import { FormErrors, FormValues } from "./types";
import { validateValues } from "./validateValues";
import { getKeys } from "@/features/global/getKeys";

const getValues = <A, I>(valuesSchema: S.Schema<A, I>) => {
	return S.decodeUnknownEither(valuesSchema);
};

export const getUpdateValuesAndErrors =
	<
		FieldKey extends string,
		Values extends FormValues,
		Errors extends FormErrors<FieldKey>,
		A extends Values,
		I,
	>({
		values,
		valuesSchema,
		errorsSchema,
		setValues,
		setErrors,
	}: {
		values: Values;
		valuesSchema: S.Schema<A, I>;
		errorsSchema: S.Schema<A, A>;
		setValues: Dispatch<SetStateAction<Values>>;
		setErrors: Dispatch<SetStateAction<Errors>>;
	}) =>
	(e: FormEvent) => {
		type State = Record<FieldKey, string>;

		if (!(e.currentTarget instanceof HTMLFormElement)) {
			return;
		}
		const formData = new FormData(e.currentTarget);
		const fieldKeys = getKeys(values) as FieldKey[];
		const emptyState = fieldKeys.reduce((acc, key) => {
			acc[key] = "";
			return acc;
		}, {} as State);
		const state = {
			...emptyState,
			...Object.fromEntries(formData.entries()),
		} as State;

		const valuesResult = getValues(valuesSchema)(state);

		if (Either.isLeft(valuesResult)) {
			return;
		}

		const result = validateValues<Errors["fieldErrors"], State, FieldKey, A>(
			errorsSchema,
		)(valuesResult.right);

		if (Either.isLeft(result)) {
			setErrors((errors) => ({
				...errors,
				fieldErrors: result.left,
			}));
		} else {
			setValues(result.right);
			setErrors({} as Errors);
		}
	};
