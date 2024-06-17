import { ReactNode, createContext } from "react";

import { FormErrors, FormValues } from "./types";

export const FormContext = createContext<{
	values: Record<string, unknown>;
	errors: FormErrors;
	setValues: unknown;
	setErrors: unknown;
	messageMap: Record<string, string[]>;
}>({
	values: {},
	errors: { fieldErrors: {} },
	setValues: () => undefined,
	setErrors: () => undefined,
	messageMap: {},
});

export const FormProvider = <
	Values extends FormValues<FieldKey>,
	Errors extends FormErrors<FieldKey>,
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
