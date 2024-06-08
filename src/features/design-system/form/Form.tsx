import { Schema as S } from "@effect/schema";
import { Dispatch, FormEvent, FormHTMLAttributes, SetStateAction } from "react";

import { FormProvider } from "./FormContext";
import { getUpdateValuesAndErrors } from "./getUpdateValuesAndErrors";
import { FormErrors, FormValues } from "./types";

export const Form = <
	FieldKey extends string,
	Values extends FormValues<FieldKey>,
	Errors extends FormErrors<FieldKey>,
	A extends Values,
	I extends Record<FieldKey, string>,
>({
	values,
	errors,
	setValues,
	setErrors,
	messageMap,
	onChange,
	onFocus,
	valuesSchema,
	errorsSchema,
	children,
	...formProps
}: FormHTMLAttributes<HTMLFormElement> & {
	values: Values;
	errors: Errors;
	setValues: Dispatch<SetStateAction<Values>>;
	setErrors: Dispatch<SetStateAction<Errors>>;
	messageMap: Record<FieldKey, string[]>;
	onChange?: (e: FormEvent<HTMLFormElement>) => void;
	onFocus?: (e: FormEvent<HTMLFormElement>) => void;
	valuesSchema: S.Schema<A, I>;
	errorsSchema: S.Schema<A, A>;
}) => {
	const updateValuesAndErrors = getUpdateValuesAndErrors({
		values,
		valuesSchema,
		errorsSchema,
		setValues,
		setErrors,
	});

	return (
		<FormProvider
			values={values}
			errors={errors}
			setValues={setValues}
			setErrors={setErrors}
			messageMap={messageMap}
		>
			<form
				className="flex flex-col gap-[2rem]"
				onFocus={(e) => {
					updateValuesAndErrors(e);
					onFocus?.(e);
				}}
				onChange={(e) => {
					updateValuesAndErrors(e);
					onChange?.(e);
				}}
				{...formProps}
			>
				{children}
			</form>
		</FormProvider>
	);
};
