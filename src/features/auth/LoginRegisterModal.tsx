"use client";

import { useState } from "react";

import {
	Field,
	FieldError,
	FieldLabel,
	FieldMessages,
} from "../design-system/Field";
import { Form } from "../design-system/Form";
import { Input } from "../design-system/Input";
import { Modal, ModalContent, ModalFooter } from "../design-system/Modal";
import {
	RegisterFormFieldKey,
	RegistrationFormErrors,
	RegistrationFormValues,
	fieldMessageMap,
	validateRegistrationForm,
} from "./registrationForm";
import { SignInData } from "./signInData";
import { register } from "@/actions/register";
import { Button } from "@/components/ui/button";

const FORM_ID = "register-form";

export const LoginRegisterModal = ({
	open,
	setOpen,
	signInData,
}: {
	open: boolean;
	setOpen: (isOpen: boolean) => void;
	signInData?: SignInData | undefined;
}) => {
	const [values, setValues] = useState({} as RegistrationFormValues);
	const [errors, setErrors] = useState({} as RegistrationFormErrors);

	console.log({ values, errors });

	return (
		<Modal heading="Welcome to Song Share!" open={open} setOpen={setOpen}>
			<ModalContent>
				<p>Create a user name to get started</p>

				<Form
					id={FORM_ID}
					setValues={setValues}
					setErrors={setErrors}
					validateForm={validateRegistrationForm}
					onSubmit={() => {
						register(
							JSON.stringify({
								...values,
								...signInData,
							}),
						);
					}}
				>
					<Field>
						<FieldLabel>User name</FieldLabel>
						<FieldMessages
							messages={fieldMessageMap[RegisterFormFieldKey.Username]}
						/>
						<Input
							name={RegisterFormFieldKey.Username}
							type="text"
							placeholder="User name"
						/>
						<FieldError error={errors[RegisterFormFieldKey.Username]} />
					</Field>

					<Field>
						<FieldLabel>I agree to the terms and conditions</FieldLabel>
						<Input
							name={RegisterFormFieldKey.AcceptTermsAndConditions}
							type="checkbox"
						/>
						<FieldError
							error={errors[RegisterFormFieldKey.AcceptTermsAndConditions]}
						/>
					</Field>
				</Form>
			</ModalContent>

			<ModalFooter>
				<Button
					type="submit"
					form={FORM_ID}
					disabled={Object.keys(errors).length > 0}
				>
					Register
				</Button>
				<Button
					onClick={() => {
						setOpen(false);
					}}
				>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};
