import { Dispatch, FormEvent, FormHTMLAttributes, SetStateAction } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const Form = <
	Values,
	Errors,
	ValidateForm extends (
		data: Values,
	) => (Record<keyof Values, string> | undefined)[] | (Values | undefined)[],
>({
	setValues,
	setErrors,
	onChange,
	validateForm,
	children,
	...formProps
}: FormProps & {
	setValues: Dispatch<SetStateAction<Values>>;
	setErrors: Dispatch<SetStateAction<Errors>>;
	onChange?: (e: FormEvent<HTMLFormElement>) => void;
	validateForm: ValidateForm;
}) => {
	return (
		<form
			onChange={(e) => {
				const formData = new FormData(e.currentTarget);
				console.log({ formDataEntries: formData.entries() });
				formData.forEach((value, key) => {
					console.log({ key, value });
				});
				const state = Object.fromEntries(formData.entries()) as Values;

				const [errors, values] = validateForm(state);

				console.log("on change called", { state, errors, values });

				if (errors) {
					setErrors(errors as Errors);
				} else {
					setValues(values as Values);
					setErrors({} as Errors);
				}
				onChange?.(e);
			}}
			{...formProps}
		>
			{children}
		</form>
	);
};
