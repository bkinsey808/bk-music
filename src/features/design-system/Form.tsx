import { ArrayFormatter, Schema as S } from "@effect/schema";
import { Either } from "effect";
import { FormEvent, FormHTMLAttributes, ReactNode, createContext } from "react";

import { getKeys } from "../global/getKeys";

const validateForm = <
	Errors,
	State extends Record<FieldKey, string>,
	FieldKey extends string,
	A,
	I,
>(
	schema: S.Schema<A, I>,
) => {
	const decodeUnknownEither = S.decodeUnknownEither(schema, { errors: "all" });
	return (data: State) =>
		Either.mapLeft(
			decodeUnknownEither(data),
			(parseError) =>
				ArrayFormatter.formatErrorSync(parseError).reduce(
					(acc, issue) => {
						const errorKey = issue.path.join(".") as FieldKey;
						acc[errorKey] = issue.message;
						return acc;
					},
					{} as Record<FieldKey, string>,
				) as Errors,
		);
};

export const FormContext = createContext<{
	values: Record<string, unknown>;
	errors: Record<string, string>;
	setValues: unknown;
	setErrors: unknown;
	messageMap: Record<string, string[]>;
}>({
	values: {},
	errors: {},
	setValues: () => {},
	setErrors: () => {},
	messageMap: {},
});

export const FormProvider = <
	Values extends Record<FieldKey, unknown>,
	Errors extends Record<FieldKey, string>,
	MessageMap extends Record<FieldKey, string[]>,
	FieldKey extends string,
>({
	values,
	errors,
	setValues,
	setErrors,
	messageMap,
	children,
}: {
	values: Values;
	errors: Errors;
	setValues: (values: Values) => void;
	setErrors: (errors: Errors) => void;
	messageMap: MessageMap;
	children: ReactNode;
}) => {
	return (
		<FormContext.Provider
			value={{ values, errors, setValues, setErrors, messageMap }}
		>
			{children}
		</FormContext.Provider>
	);
};

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const Form = <
	FieldKey extends string,
	Values extends Record<FieldKey, unknown>,
	Errors extends Record<FieldKey, string>,
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
	schema,
	children,
	...formProps
}: FormProps & {
	values: Values;
	errors: Errors;
	setValues: (values: Values) => void;
	setErrors: (errors: Errors) => void;
	messageMap: Record<FieldKey, string[]>;
	onChange?: (e: FormEvent<HTMLFormElement>) => void;
	onFocus?: (e: FormEvent<HTMLFormElement>) => void;
	schema: S.Schema<A, I>;
}) => {
	type State = Record<FieldKey, string>;

	const update = (e: FormEvent) => {
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
		console.log({ state });
		const result = validateForm<Errors, State, FieldKey, A, I>(schema)(state);

		if (Either.isLeft(result)) {
			setErrors(result.left);
		} else {
			setValues(result.right);
			setErrors({} as Errors);
		}
	};

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
					update(e);
					onFocus?.(e);
				}}
				onChange={(e) => {
					update(e);
					onChange?.(e);
				}}
				{...formProps}
			>
				{children}
			</form>
		</FormProvider>
	);
};
