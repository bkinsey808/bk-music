"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { Field } from "../design-system/form/Field";
import { Form } from "../design-system/form/Form";
import { Input } from "../design-system/form/Input";
import { FormErrors } from "../design-system/form/types";
import { RegisterErrorsSchema } from "./RegisterErrorsSchema";
import { RegisterValuesSchema } from "./RegisterValuesSchema";
import { MessageKey, RegisterFormFieldKey, RegisterResult } from "./enums";
import { RegisterValues, SignInData } from "./types";
import { useAuth } from "./useAuth";
import { register } from "@/actions/register";

export const registerFormFieldMessageMap: Record<
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

export const RegisterForm = <
	RegisterErrors extends FormErrors<RegisterFormFieldKey>,
>({
	id,
	signInData,
	errors,
	setErrors,
	setSubmitting,
	setOpen,
}: {
	id: string;
	signInData: SignInData;
	errors: RegisterErrors;
	setErrors: Dispatch<SetStateAction<RegisterErrors>>;
	setSubmitting: Dispatch<SetStateAction<boolean>>;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const [values, setValues] = useState<RegisterValues>({
		[RegisterFormFieldKey.Username]: "",
		[RegisterFormFieldKey.AcceptTermsAndConditions]: false,
	});

	const { setUserData } = useAuth();

	return (
		<Form
			id={id}
			values={values}
			errors={errors}
			setValues={setValues}
			setErrors={setErrors}
			messageMap={registerFormFieldMessageMap}
			valuesSchema={RegisterValuesSchema}
			errorsSchema={RegisterErrorsSchema}
			onSubmit={async (e) => {
				e.preventDefault();
				setSubmitting(true);
				const result = await register({
					serializedRegisterValues: JSON.stringify(values),
					serializedSignInData: JSON.stringify(signInData),
				});

				if (result.result === RegisterResult.ERROR) {
					setErrors({
						formError: result.formError,
						fieldErrors: result.fieldErrors,
					} as RegisterErrors);
				}
				setSubmitting(false);
				if (result.result === RegisterResult.SUCCESS) {
					setUserData({
						...values,
						email: signInData.email,
						picture: signInData?.picture,
						roles: [],
					});
					setOpen(false);
				}
			}}
		>
			<Field fieldKey={RegisterFormFieldKey.Username} label="User name">
				<Input
					name={RegisterFormFieldKey.Username}
					type="text"
					placeholder="User name"
				/>
			</Field>

			<Field
				fieldKey={RegisterFormFieldKey.AcceptTermsAndConditions}
				label="I agree to the terms and conditions"
				checkbox={true}
			>
				<Input
					name={RegisterFormFieldKey.AcceptTermsAndConditions}
					type="checkbox"
				/>
			</Field>
		</Form>
	);
};
